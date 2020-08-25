import { Context, APIGatewayEvent } from "aws-lambda";
import axios from 'axios';
import * as dotenv from "dotenv";
dotenv.config();

export async function handler(event: APIGatewayEvent, context?: Context): Promise<string> {
    try {
        return await makeRequest('OK');
    } catch (error) {
        return 'failed'
    }
}

async function makeRequest(message: string) {
    const url = process.env['WEBHOOK_URL'];
    const baseRequest = axios.create({
        baseURL: url,
        responseType: 'json'
    });

    return new Promise<any>(async (resolve, reject) => {
        baseRequest.post('', {
            text: message
        })
            .then(res => {
                resolve(res)
            })
            .catch(e => {
                console.error(e);
                reject(e)
            });
    })

}
