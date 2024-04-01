import { AppRouteStructure } from '../../domain/route/app-route-structure';
import { WebhookController } from '../controller/webhook/webhook-controller';
import { GetLoginController } from '../controller/login/get-login-controller';
import { PostLoginController } from '../controller/login/post-login-controller';
import { ConfigMiddleware } from '../middleware/config-middleware';
import { GetConfigController } from '../controller/config/get-config-controller';
import { PostConfigController } from '../controller/config/post-config-controller';
import { NoUserMiddleware } from '../middleware/no-user-middleware';
import { UserMiddleware } from '../middleware/user-middleware';
import { GetHomeController } from '../controller/home/get-home-controller';
import { GetUsersController } from '../controller/users/get-users-controller';
import { GetUserController } from '../controller/user/get-user-controller';
import { PostUserController } from '../controller/user/post-user-controller';
import { GetRepositoriesController } from '../controller/repositories/get-repositories-controller';
import { GetRepositoryController } from '../controller/repository/get-repository-controller';
import { PostRepositoryController } from '../controller/repository/post-repository-controller';

export function r(
  method: AppRouteStructure['method'],
  path: AppRouteStructure['path'],
  middlewares: AppRouteStructure['middlewares'],
  controller: AppRouteStructure['controller']
) {
  return { method, path, middlewares, controller };
}

export const routes: AppRouteStructure[] = [
  r('post', '/webhook', [], WebhookController),
  // Config
  r('get', '/config', [ConfigMiddleware], GetConfigController),
  r('post', '/config', [ConfigMiddleware], PostConfigController),
  // Login
  r('get', '/login', [NoUserMiddleware], GetLoginController),
  r('post', '/login', [NoUserMiddleware], PostLoginController),
  // Home
  r('get', '/', [UserMiddleware], GetHomeController),
  // Users
  r('get', '/users', [UserMiddleware], GetUsersController),
  // User
  r('get', '/user/:id', [UserMiddleware], GetUserController),
  r('post', '/user/:id', [UserMiddleware], PostUserController),
  // Repositories
  r('get', '/repositories', [UserMiddleware], GetRepositoriesController),
  // Repository
  r('get', '/repository/:id', [UserMiddleware], GetRepositoryController),
  r('post', '/repository/:id', [UserMiddleware], PostRepositoryController)
];
