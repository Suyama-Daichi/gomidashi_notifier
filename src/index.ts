import { Context, APIGatewayEvent } from "aws-lambda";
import axios from 'axios';
import * as dotenv from "dotenv";
dotenv.config();

export async function handler(event: APIGatewayEvent, context?: Context): Promise<string> {
    const token = process.env['SECRET'];
    const baseRequest = axios.create({
        baseURL: `url`,
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'json'
    });

    const res = await baseRequest.get('path')
        .catch(e => {
            console.error(e);
        });
    return res ? 'success!' : 'failured';
}
