import { ExpressControllerAdapter } from '../../../../src/infra/api/express/adapter/express-controller-adapter';
import { Request, Response } from 'express';
import { TestAppHandler } from '../../../behavior/test-app-handler';

describe('Express Handler Adapter', () => {
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

  it('should call controller handle', async () => {
    await expect(adapter.handle(req, res, next)).resolves.toBeUndefined();
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith(req);
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
