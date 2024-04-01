import { AppRouteStructure } from '../../domain/route/app-route-structure';
import { WebhookController } from '../controller/webhook/webhook-controller';

export function r(
  method: AppRouteStructure['method'],
  path: AppRouteStructure['path'],
  middlewares: AppRouteStructure['middlewares'],
  controller: AppRouteStructure['controller']
) {
  return { method, path, middlewares, controller };
}

export const routes: AppRouteStructure[] = [r('post', '/webhook', [], WebhookController)];
