import { HttpRequest } from '../protocols/http-request';
import { HttpResponse } from '../protocols/http-response';
import { Middleware } from './middleware';

export interface Controller {
	readonly path: string;
	readonly method: 'get' | 'post' | 'put' | 'delete';
	readonly middlewares: Middleware[];

	handle(request: HttpRequest): Promise<HttpResponse>;
}