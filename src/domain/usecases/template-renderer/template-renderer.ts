export interface TemplateRenderer {
  render: (template: string, data: Record<string, unknown>) => Promise<string>;
}
