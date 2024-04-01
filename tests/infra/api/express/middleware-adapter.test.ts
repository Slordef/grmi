import { Request, Response } from 'express';
import { TestAppHandler } from '../../../behavior/test-app-handler';
import { ExpressMiddlewareAdapter } from '../../../../src/infra/api/express/adapter/express-middleware-adapter';

describe('Express AppMiddleware Adapter', () => {
  const mock = jest.fn();
  const controller = new TestAppHandler(mock, true);
  const adapter = new ExpressMiddlewareAdapter(controller);

  it('should create controller handler adapter', () => {
    expect(adapter).toBeDefined();
    expect(adapter.handle).toBeDefined();
  });

  const req: Request = {
    body: {},
    headers: { cookie: 'test=1;' },
    method: 'get',
    params: {},
    query: {}
  } as unknown as Request;

  const res: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  } as unknown as Response;

  const next = jest.fn();

  it('should call AppMiddleware handle', async () => {
    await expect(adapter.handle(req, res, next)).resolves.toBeUndefined();
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({
      body: {},
      headers: { cookie: 'test=1;' },
      method: 'get',
      params: {},
      cookies: { test: '1' },
      query: {}
    });
  });
});
