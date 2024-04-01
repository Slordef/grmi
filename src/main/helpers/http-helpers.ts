import { HttpResponse } from '../../domain/protocols/http-response';
import { TemplateResponse } from '../../domain/protocols/template-response';

export const ok = (data: unknown): HttpResponse => ({
  statusCode: 200,
  body: data
});

export const template = (template: TemplateResponse): HttpResponse => ({
  statusCode: 200,
  body: template,
  template: true
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error.message
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error.message
});

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error.message
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error.message
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
});

export const created = (data: unknown): HttpResponse => ({
  statusCode: 201,
  body: data
});

export const redirect = (url: string): HttpResponse => ({
  statusCode: 302,
  body: url
});

export const unprocessableEntity = (error: Error): HttpResponse => ({
  statusCode: 422,
  body: error.message
});

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error.message
});

export const tooManyRequests = (error: Error): HttpResponse => ({
  statusCode: 429,
  body: error.message
});

export const unsupportedMediaType = (error: Error): HttpResponse => ({
  statusCode: 415,
  body: error.message
});

export const badGateway = (error: Error): HttpResponse => ({
  statusCode: 502,
  body: error.message
});

export const serviceUnavailable = (error: Error): HttpResponse => ({
  statusCode: 503,
  body: error.message
});

export const gatewayTimeout = (error: Error): HttpResponse => ({
  statusCode: 504,
  body: error.message
});
