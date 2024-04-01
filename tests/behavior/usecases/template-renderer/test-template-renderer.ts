import { TemplateRenderer } from '../../../../src/domain/usecases/template-renderer/template-renderer';

export class TestTemplateRenderer implements TemplateRenderer {
  constructor(
    private readonly mock: (template: string, data: Record<string, unknown>) => Promise<string>
  ) {}
  async render(template: string, data: Record<string, unknown>): Promise<string> {
    return this.mock(template, data);
  }
}
