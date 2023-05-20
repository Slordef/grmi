/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebhookController } from '../../../src/main/controller/webhook-controller';
import { TestRepository } from '../../behavior/test-repository';
import { TestFetcher } from '../../behavior/test-fetcher';
import { TestWebhookValidation } from '../../behavior/test-webhook.validation';
import { TestRunnerManager } from '../../behavior/test-runner.manager';
import { HttpRequest } from '../../../src/domain/protocols/http-request';
import { expect } from '@jest/globals';
import { Repository } from '../../../src/domain/database/params/repository';
import { User } from '../../../src/domain/database/params/user';

describe('WebhookController', () => {
    const repositoryMock = jest.fn(() => ({
        html_url: '', id: 0, labels: [], name: '', owner: '', secret: '', userId: 0
    }));
    const userMock = jest.fn(() => ({
        id: 0, email: '', name: '', password: '', username: '', token: '123', login: ''
    }));
    const validationMock: jest.Mock<undefined | Error> = jest.fn(() => undefined);
    const fetchMock: jest.Mock<{ status: number, body: any }> = jest.fn(() => ({
        status: 201,
        body: {
            token: '123'
        }
    }));
    const running = jest.fn();

    const webhookController = new WebhookController(
        new TestRepository<Repository>(repositoryMock),
        new TestRepository<User>(userMock),
        new TestWebhookValidation(validationMock),
        new TestFetcher(fetchMock),
        new TestRunnerManager(running)
    );
    const req: jest.Mock<HttpRequest> = jest.fn(() => ({
        headers: {},
        method: 'POST',
        params: {},
        query: {},
        body: {
            action: 'queued',
            workflow_job: {
                id: 1,
                run_id: 1,
                labels: ['test', 'self-hosted'],
                workflow_name: 'test',
                status: 'queued'
            },
            repository: {
                id: 1,
                name: 'test',
                html_url: 'test',
                owner: {
                    id: 1,
                    login: 'test',
                }
            }
        }
    }));

    it('should call handler and work', async () => {
        const response = await webhookController.handle(req());
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'Runner created'
        });
        expect(running).toBeCalled();
        expect(running).toBeCalledTimes(1);
        expect(running).toBeCalledWith(1, '', '123', 'runner-1', ['test', 'self-hosted']);
    });
    it('should call handler and not work: Not self-hosted', async () => {
        req.mockImplementationOnce(() => ({
            headers: {},
            method: 'POST',
            params: {},
            query: {},
            body: {
                action: 'queued',
                workflow_job: {
                    id: 1,
                    run_id: 1,
                    labels: ['test'],
                    workflow_name: 'test',
                    status: 'queued'
                },
                repository: {
                    id: 1,
                    name: 'test',
                    html_url: 'test',
                    owner: {
                        id: 1,
                        login: 'test',
                    }
                }
            }
        }));
        const response = await webhookController.handle(req());
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'Not self-hosted'
        });
    });
    it('should call handler and not work: Repository not found', async () => {
        repositoryMock.mockImplementationOnce(() => {
            throw new Error();
        });
        const response = await webhookController.handle(req());
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'Repository not found'
        });
    });
    it('should call handler and not work: Validation fail', async () => {
        validationMock.mockReturnValueOnce(new Error('Validation fail'));
        const response = await webhookController.handle(req());
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'Validation fail'
        });
    });
    it('should call handler and not work: Unknown action', async () => {
        req.mockImplementationOnce(() => ({
            headers: {},
            method: 'POST',
            params: {},
            query: {},
            body: {
                action: 'unknown',
                workflow_job: {
                    id: 1,
                    run_id: 1,
                    labels: ['test', 'self-hosted'],
                    workflow_name: 'test',
                    status: 'queued'
                },
                repository: {
                    id: 1,
                    name: 'test',
                    html_url: 'test',
                    owner: {
                        id: 1,
                        login: 'test',
                    }
                }
            }
        }));
        const response = await webhookController.handle(req());
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'Unknown action'
        });
    });
    it('should call handler and not work: User not found', async () => {
        userMock.mockImplementationOnce(() => {
            throw new Error();
        });
        const response = await webhookController.handle(req());
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'User not found'
        });
    });
    it('should call handler and not work: No response from github', async () => {
        fetchMock.mockImplementationOnce(() => {
            throw new Error();
        });
        const response = await webhookController.handle(req());
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'No response from github'
        });
    });
    it('should call handler and not work: Failed to register runner', async () => {
        fetchMock.mockImplementationOnce(() => ({
            status: 400,
            body: {}
        }));
        const response = await webhookController.handle(req());
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'Failed to register runner'
        });
    });
    it('should call handler and not work: Failed to parse response from github', async () => {
        fetchMock.mockImplementationOnce(() => ({
            status: 201,
            body: {
                token: undefined
            }
        }));
        const response = await webhookController.handle(req());
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'Failed to parse response from github'
        });
    });
});