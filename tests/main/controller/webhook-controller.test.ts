/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebhookController } from '../../../src/main/controller/webhook/webhook-controller';
import { expect, jest } from '@jest/globals';
import { testCreateCore } from '../../behavior/test-create-core';
import {
  createTestRepositoryRepositoryPlugin,
  createTestUserRepositoryPlugin
} from '../../behavior/usecases/repository/test-repository-plugin';
import { Validation } from '../../../src/domain/validation/validation';
import { createTestFetcherPlugin } from '../../behavior/usecases/fetcher/test-fetcher-plugin';
import { FetcherOptions } from '../../../src/domain/usecases/fetcher/fetcher';
import { FetchResponse } from '../../../src/domain/protocols/fetch-response';
import { createTestRunManagerPlugin } from '../../behavior/usecases/runner/test-run-manager-plugin';

const validationMock: jest.Mock<() => Promise<Error | undefined>> = jest.fn(() =>
  Promise.resolve(undefined)
);
jest.mock('../../../src/main/validation/webhook-validation', () => {
  class WebhookValidation implements Validation {
    async validate(): Promise<Error | undefined> {
      return validationMock();
    }
  }
  return { WebhookValidation };
});

describe('WebhookController', () => {
  const repositoryMock = jest.fn(() => ({
    html_url: '',
    id: 0,
    labels: [],
    name: '',
    owner: '',
    secret: '',
    userId: 0
  }));
  const userMock = jest.fn(() => ({
    id: 0,
    email: '',
    name: '',
    password: '',
    username: '',
    token: '123',
    login: ''
  }));
  const fetchMock: jest.Mock<(url: string, options?: FetcherOptions) => Promise<FetchResponse>> =
    jest.fn(async () => {
      return {
        status: 201,
        body: {
          token: '123'
        }
      };
    });
  const running = jest.fn();

  const core = testCreateCore({
    testRepositoryRepositoryPlugin: createTestRepositoryRepositoryPlugin(repositoryMock),
    testUserRepositoryPlugin: createTestUserRepositoryPlugin(userMock),
    testFetcherPlugin: createTestFetcherPlugin(fetchMock),
    testRunManagerPlugin: createTestRunManagerPlugin(running)
  });
  const webhookController = new WebhookController(core);
  const req = jest.fn(() => ({
    headers: {
      'x-hub-signature': 'test'
    },
    method: 'POST',
    params: {},
    query: {},
    cookies: {},
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
          login: 'test'
        }
      }
    },
    user: undefined
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
      headers: {
        'x-hub-signature': 'test'
      },
      method: 'POST',
      params: {},
      query: {},
      cookies: {},
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
            login: 'test'
          }
        }
      },
      user: undefined
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
    validationMock.mockReturnValueOnce(Promise.resolve(new Error('Validation fail')));
    const response = await webhookController.handle(req());
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Validation fail'
    });
  });
  it('should call handler and not work: Unknown action', async () => {
    req.mockImplementationOnce(() => ({
      headers: {
        'x-hub-signature': 'test'
      },
      method: 'POST',
      params: {},
      query: {},
      cookies: {},
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
            login: 'test'
          }
        }
      },
      user: undefined
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
    fetchMock.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
        body: {}
      })
    );
    const response = await webhookController.handle(req());
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Failed to register runner'
    });
  });
  it('should call handler and not work: Failed to parse response from github', async () => {
    fetchMock.mockReturnValueOnce(
      Promise.resolve({
        status: 201,
        body: {
          token: undefined
        }
      })
    );
    const response = await webhookController.handle(req());
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Failed to parse response from github'
    });
  });
});
