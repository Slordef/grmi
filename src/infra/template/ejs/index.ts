import { AppCorePlugin } from '../../../domain/core/app-core-plugin';
import { AppCorePluginManager } from '../../../domain/core/app-core-plugin-manager';
import { EjsTemplateEngine } from './ejs-template-engine';

export class EjsPlugin implements AppCorePlugin {
  install(manager: AppCorePluginManager): void {
    manager.register('TemplateRenderer', new EjsTemplateEngine());
  }
}
