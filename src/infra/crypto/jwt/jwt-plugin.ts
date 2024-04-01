import { AppCorePlugin } from '../../../domain/core/app-core-plugin';
import { AppCorePluginManager } from '../../../domain/core/app-core-plugin-manager';
import { JwtAdapter } from './jwt-adapter';

export class JwtPlugin implements AppCorePlugin {
  install(manager: AppCorePluginManager): void {
    const jwtAdapter = new JwtAdapter();

    manager.register('TokenGenerator', jwtAdapter);
    manager.register('TokenVerifier', jwtAdapter);
  }
}
