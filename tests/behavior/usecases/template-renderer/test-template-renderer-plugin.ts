import { TestTemplateRenderer } from './test-template-renderer';
import { AppCorePlugin } from '../../../../src/domain/core/app-core-plugin';
import { AppCorePluginManager } from '../../../../src/domain/core/app-core-plugin-manager';

export function createTestTemplateRendererPlugin(
  mock: (template: string, data: Record<string, unknown>) => Promise<string> = jest.fn(),
  testTemplateRenderer = TestTemplateRenderer
) {
  class TestTemplateRendererPlugin implements AppCorePlugin {
    install(manager: AppCorePluginManager): void {
      manager.register('TemplateRenderer', new testTemplateRenderer(mock));
    }
  }
  return TestTemplateRendererPlugin;
}
