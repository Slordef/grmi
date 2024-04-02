export interface HttpResponse {
  statusCode: number;
  body: unknown;
  template?: boolean;
  cookies?: {
    name: string;
    value: string;
    options: {
      maxAge?: number;
      expires?: Date;
      httpOnly?: boolean;
      secure?: boolean;
      domain?: string;
      path?: string;
      sameSite?: boolean | 'lax' | 'strict' | 'none';
    };
  }[];
}
