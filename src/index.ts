import { Response } from './APIGWResponse.d';
import { Context, APIGatewayEvent } from "aws-lambda";
import axios, { AxiosResponse } from 'axios';
import * as dotenv from "dotenv";
import * as dateFns from 'date-fns';
dotenv.config();

const gomiDefine: GomiDefine = {
    0: [
        { type: null, until: null, isOnceEveryTwoWeeks: false }
    ],
    1: [
        { type: null, until: null, isOnceEveryTwoWeeks: false }
    ],
    2: [
        { type: '燃えるゴミ', until: '8時', isOnceEveryTwoWeeks: false }
    ],
    3: [
        { type: null, until: null, isOnceEveryTwoWeeks: false }
    ],
    4: [
        { type: '容器包装プラスチック', until: '8時', isOnceEveryTwoWeeks: false },
        { type: '古紙・段ボール', until: '8時', isOnceEveryTwoWeeks: false }
    ],
    5: [
        { type: '燃えるゴミ', until: '8時', isOnceEveryTwoWeeks: false }
    ],
    6: [
        { type: '燃えないゴミ', until: '8時', isOnceEveryTwoWeeks: true },
        { type: 'ビン', until: '9時', isOnceEveryTwoWeeks: false },
        { type: '缶', until: '9時', isOnceEveryTwoWeeks: false },
        { type: 'ペットボトル', until: '9時', isOnceEveryTwoWeeks: false }
    ]
}

export async function handler(event: APIGatewayEvent, context?: Context) {
    const currentDate = dateFns.addHours(new Date(), 9);
    const tommorowDate = dateFns.addDays(currentDate, 1);
    const youbi = dateFns.getDay(tommorowDate);
    let typesOfGomi = gomiDefine[youbi].filter(f => f.type);
    let response: Response;

    if (typesOfGomi.length !== 0) {
        if (dateFns.getWeekOfMonth(tommorowDate) % 2 !== 0) {
            typesOfGomi = typesOfGomi.filter(f => !f.isOnceEveryTwoWeeks)
        }
        let message = `明日は\n${typesOfGomi.map(m => ` \`${m.type}\` ... \`${m.until}\` まで`).join('\n')}\nの日です！`;
        try {
            await makeRequest(message);
        } catch (error) {
            response = {
                isBase64Encoded: false,
                statusCode: 500,
                headers: {},
                body: JSON.stringify({ message: typesOfGomi })
            };
        }
    }

    response = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {},
        body: JSON.stringify({ message: typesOfGomi })
    };

    return response;
}

async function makeRequest(message: string) {
    const url = process.env['WEBHOOK_URL'];
    const baseRequest = axios.create({
        baseURL: url,
        responseType: 'json'
    });

    return new Promise<AxiosResponse>(async (resolve, reject) => {
        baseRequest.post('', {
            text: message,
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: message + 'https://www.city.nerima.tokyo.jp/kurashi/gomi/wakekata/index.html'
                    }
                }]
        },
        )
            .then(res => {
                resolve(res)
            })
            .catch(e => {
                console.error(e);
                reject(e)
            });
    })

}

interface GomiDefine {
    0: Gomi[],
    1: Gomi[]
    2: Gomi[]
    3: Gomi[]
    4: Gomi[]
    5: Gomi[]
    6: Gomi[]
}

interface Gomi {
    until: '8時' | '9時' | null;
    type: null | '燃えるゴミ' | '燃えないゴミ' | '缶' | 'ビン' | 'ペットボトル' | '容器包装プラスチック' | '古紙・段ボール';
    isOnceEveryTwoWeeks: boolean;
}