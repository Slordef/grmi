import { HttpRequest } from '../protocols/http-request';
import { HttpResponse } from '../protocols/http-response';

export interface Middleware {
	handle(request: HttpRequest): Promise<HttpResponse>;
}