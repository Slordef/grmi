export const ok = (data: unknown) => ({
  statusCode: 200,
  body: data
});

export const badRequest = (error: Error) => ({
  statusCode: 400,
  body: error.message
});

export const serverError = (error: Error) => ({
  statusCode: 500,
  body: error.message
});

export const notFound = (error: Error) => ({
  statusCode: 404,
  body: error.message
});

export const unauthorized = (error: Error) => ({
  statusCode: 401,
  body: error.message
});

export const forbidden = (error: Error) => ({
  statusCode: 403,
  body: error.message
});

export const noContent = () => ({
  statusCode: 204,
  body: null
});

export const created = (data: unknown) => ({
  statusCode: 201,
  body: data
});

export const redirect = (url: string) => ({
  statusCode: 302,
  body: url
});

export const unprocessableEntity = (error: Error) => ({
  statusCode: 422,
  body: error.message
});

export const conflict = (error: Error) => ({
  statusCode: 409,
  body: error.message
});

export const tooManyRequests = (error: Error) => ({
  statusCode: 429,
  body: error.message
});

export const unsupportedMediaType = (error: Error) => ({
  statusCode: 415,
  body: error.message
});

export const badGateway = (error: Error) => ({
  statusCode: 502,
  body: error.message
});

export const serviceUnavailable = (error: Error) => ({
  statusCode: 503,
  body: error.message
});

export const gatewayTimeout = (error: Error) => ({
  statusCode: 504,
  body: error.message
});
