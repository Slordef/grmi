import { Controller } from '../core/Controller';
import { EventEndpointWebhook } from '../events/EventEndpointWebhook';
import { RepositoryEntity } from '../entities/RepositoryEntity';
import { IResponseGithubAPIRegisterRepositoryRunner } from '../interface/IResponseGithubAPI';
import { UserEntity } from '../entities/UserEntity';
import { Webhook } from '../core/Webhook';

export class EndpointWebhookController extends Controller {
    public readonly type = EventEndpointWebhook;

    public execute(event: EventEndpointWebhook): void {
        const repository = this.entityContainer.find(RepositoryEntity, event.endpoint.body.repository.id);
        if (repository) {
            this.action(event, repository);
        } else {
            console.log('Repository not found');
        }
    }

    public async action(event: EventEndpointWebhook, repository: RepositoryEntity): Promise<void> {
        const valid = await Webhook.verify(event.endpoint.body, event.endpoint.request, repository.get().secret ?? '');
        if (!valid) return;
        switch (event.endpoint.body.action) {
        case 'queued':
            this.queued(event, repository).catch(e => console.log(e));
            break;
        }
    }

    public async fetchRunnerToken(repo: string, owner: string, token: string): Promise<string> {
        const response = await this.adapter.fetch(
            `https://api.github.com/repos/${owner}/${repo}/actions/runners/registration-token`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Authorization': `token ${token}`,
                    'X-Github-Api-Version': '2022-11-28'
                }
            }
        );
        if (!response) {
            throw new Error('No response from github');
        }
        if (response.status !== 201) {
            throw new Error('Failed to register runner');
        }
        const data = await response.body;
        const result = IResponseGithubAPIRegisterRepositoryRunner.parse(data);
        return result.token;
    }

    public async queued(event: EventEndpointWebhook, repository: RepositoryEntity): Promise<void> {
        console.log('queued');

        const user = this.entityContainer.find(UserEntity, repository.get().owner.id);
        if (!user) {
            throw new Error('User not found');
        }
        const userToken = user.get().token;
        if (!userToken) {
            throw new Error('User token not found');
        }

        const token = await this.fetchRunnerToken(
            event.endpoint.body.repository.name,
            event.endpoint.body.repository.owner.login,
            userToken
        );

        const index = event.endpoint.body.workflow_job.id;

        this.manager.createRunnerContainer(
            index,
            repository.get().html_url,
            token,
            `runner-${index}`,
            ['tests']
        );
    }

    public async completed(): Promise<void> {
        console.log('completed');
        // commented out because it's not working, we can't be sur that container run the right workflow job
        // const runner = this.entityContainer.find(RunnerEntity, event.endpoint.body.workflow_job.id);
        // if (!runner) {
        //     throw new Error('Runner not found');
        // }
        // repository.removeRunner(runner);
        //
        // const container = runner.container;
        // if (!container) {
        //     throw new Error('Container not found');
        // }
        //
        // await container.complete();
    }
}