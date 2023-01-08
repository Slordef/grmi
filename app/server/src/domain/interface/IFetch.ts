export interface IFetchRequest {
    method: string;
    headers: Record<string, string>;
}

export interface IFetchResponse {
    status: number;
    body: unknown;
}