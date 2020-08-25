import { Context, APIGatewayEvent } from "aws-lambda";
import axios, { AxiosResponse } from 'axios';
import * as dotenv from "dotenv";
import * as dateFns from 'date-fns';
dotenv.config();

const gomiDefine = {
    0: null,
    1: null,
    2: ['燃えるゴミ'],
    3: null,
    4: ['容器包装プラスチック・古紙'],
    5: ['燃えるゴミ'],
    6: ['ビン・缶・ペットボトル', '不燃ごみ'],
}

export async function handler(event: APIGatewayEvent, context?: Context) {
    const currentDate = new Date();
    const tommorowDate = dateFns.addDays(currentDate, 4);
    const youbi = dateFns.getDay(tommorowDate);
    const typesOfGomi = gomiDefine[youbi];


    const response = {
        statusCode: 200,
        body: { message: typesOfGomi }
    };

    if (typesOfGomi) {
        if ((youbi === 6 && dateFns.getWeekOfMonth(tommorowDate) % 2 !== 0)) {
            typesOfGomi.pop();
        }

        try {
            response.body.message = (await makeRequest(typesOfGomi.join('・'))).data;
        } catch (error) {
            response.body.message = ['failed']
        }
    }

    return response
}

async function makeRequest(message: string) {
    const url = process.env['WEBHOOK_URL'];
    const baseRequest = axios.create({
        baseURL: url,
        responseType: 'json'
    });

    return new Promise<AxiosResponse>(async (resolve, reject) => {
        baseRequest.post('', {
            text: `明日は${message}の日です。`
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
