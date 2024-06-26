import { ExpressControllerAdapter } from '../../../../src/infra/api/express/adapter/express-controller-adapter';
import { Request, Response } from 'express';
import { TestAppHandler } from '../../../behavior/test-app-handler';

describe('Express AppMiddleware Adapter', () => {
  const mock = jest.fn();
  const controller = new TestAppHandler(mock, true);
  const adapter = new ExpressControllerAdapter(controller);

  it('should create controller handler adapter', () => {
    expect(adapter).toBeDefined();
    expect(adapter.handle).toBeDefined();
  });

  const req: Request = {
    body: {},
    headers: {},
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
    expect(mock).toBeCalled();
    expect(mock).toBeCalledWith(req);
    expect(res.status).toBeCalled();
    expect(res.status).toBeCalledWith(200);
  });
});
