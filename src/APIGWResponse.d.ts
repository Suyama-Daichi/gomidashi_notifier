export interface Response {
    isBase64Encoded: boolean;
    statusCode: number,
    headers: Object,
    body: string;
}