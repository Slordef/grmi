import { Controller } from '../../domain/controller/controller';
import { HttpRequest } from '../../domain/protocols/http-request';
import { HttpResponse } from '../../domain/protocols/http-response';
import { ok } from '../helpers/http-helpers';
import { Database } from '../../domain/database/database';
import { Repository } from '../../domain/database/params/repository';
import { Validation } from '../../domain/usecases/validation';
import { Fetcher } from '../../domain/request/fetcher';
import { User } from '../../domain/database/params/user';
import { RunManager } from '../../domain/usecases/run-manager';
import { log } from '../helpers/logger';
import { Webhook } from '../../domain/params/webhook';
import { ResponseGithubAPIRegisterRepositoryRunner } from '../../domain/params/response-github-api';

export class WebhookController implements Controller {
    readonly method = 'post';
    readonly middlewares = [];
    readonly path = '/webhook';

    constructor(
		private readonly RepositoryRepository: Database<Repository>,
		private readonly userRepository: Database<User>,
		private readonly webhookValidation: Validation,
		private readonly fetcher: Fetcher,
		private readonly manager: RunManager
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const data = Webhook.parse(request.body);
            // Check that the webhook is for a self-hosted runner only
            if (!data.workflow_job.labels.includes('self-hosted')) {
                log('Not self-hosted');
                return ok({
                    message: 'Not self-hosted'
                });
            }
            // Get Repository from database
            const repository = await this.RepositoryRepository.get(data.repository.id).catch(() => undefined);
            // if Repository not exists stop
            if (!repository) {
                log('Repository not found');
                return ok({
                    message: 'Repository not found'
                });
            }
            // Check that the webhook has valid signature
            const body = JSON.stringify(request.body);
            const secret = repository.secret ?? '';
            const signature = request.headers['x-hub-signature'] as string;
            const validWebhook = await this.webhookValidation.validate({ body, secret, signature });
            if (validWebhook instanceof Error) {
                log(validWebhook);
                return ok({
                    message: validWebhook.message
                });
            }
            // Check that labels are same as required
            if (!repository.labels.every(l => data.workflow_job.labels.includes(l))) {
                log('Labels not corresponding');
                return ok({
                    message: 'Labels not corresponding'
                });
            }
            // perform only on "queued" action
            if (data.action !== 'queued') {
                log('Unknown action');
                return ok({
                    message: 'Unknown action'
                });
            }
            // Get user from database
            const user = await this.userRepository.get(repository.userId).catch(() => undefined);
            // if user not exists stop
            if (!user || !user.token) {
                log('User not found');
                return ok({
                    message: 'User not found'
                });
            }
            // Get token from github for a runner
            const githubURL = `https://api.github.com/repos/${data.repository.owner.login}/${data.repository.name}/actions/runners/registration-token`;
            const githubHeaders = {
                'Accept': 'application/vnd.github+json',
                'Authorization': `token ${user.token}`,
                'X-Github-Api-Version': '2022-11-28'
            };
            const githubResponse = await this.fetcher.fetch(githubURL, {
                method: 'POST', headers: githubHeaders
            }).catch(err => {
                log(err);
                return undefined;
            });
            // Check response from github
            if (!githubResponse) {
                log('No response from github');
                return ok({
                    message: 'No response from github'
                });
            }
            const githubObject = ResponseGithubAPIRegisterRepositoryRunner.parse(githubResponse);
            if (githubObject.status !== 201) {
                log('Failed to register runner');
                return ok({
                    message: 'Failed to register runner'
                });
            }
            if (!githubObject.body || !githubObject.body.token) {
                log('Failed to parse response from github');
                return ok({
                    message: 'Failed to parse response from github'
                });
            }
            // Create runner
            this.manager.createRunnerContainer(data.workflow_job.id, repository.html_url, githubObject.body.token, `runner-${data.workflow_job.id}`, data.workflow_job.labels);

            return ok({
                message: 'Runner created'
            });
        } catch (error) {
            log(error);
            return ok({
                message: error
            });
        }
    }

}


