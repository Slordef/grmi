export interface HttpRequest {
  headers: Record<string, string | string[] | undefined>;
  method: string;
  body: unknown;
  params: unknown;
  query: unknown;
  cookies: Record<string, string>;
  user: unknown;
}
