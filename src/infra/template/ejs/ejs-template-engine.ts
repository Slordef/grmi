import ejs from 'ejs';
import { TemplateRenderer } from '../../../domain/usecases/template-renderer/template-renderer';
import { env } from '../../../main/config';

export class EjsTemplateEngine implements TemplateRenderer {
  async render(template: string, data: Record<string, unknown>): Promise<string> {
    const filepath = `${env.BASE_SRC}/templates/${template}.ejs`;
    return ejs.renderFile(filepath, data);
  }
}
