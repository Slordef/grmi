/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
import { ApiServer } from '../../../../src/domain/usecases/api-server/api-server';
import { AppRoute } from '../../../../src/domain/route/app-route';

export class TestApiServer implements ApiServer {
  constructor(private readonly mock: jest.Mock) {}
  async start(): Promise<void> {
    this.mock();
  }
  route(route: AppRoute): void {
    this.mock(route);
  }
}
