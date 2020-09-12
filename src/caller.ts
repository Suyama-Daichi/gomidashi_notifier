import { APIGatewayEvent } from "aws-lambda";
import { handler } from './index';
import fs from 'fs';

export const apiGatewayEvent: APIGatewayEvent = {
    body: fs.readFileSync('./event.json', 'utf8'),
    headers: {},
    httpMethod: 'POST',
    isBase64Encoded: false,
    multiValueQueryStringParameters: null,
    multiValueHeaders: {},
    path: '',
    pathParameters: null,
    queryStringParameters: null,
    requestContext: {
        accountId: '123456789',
        apiId: '',
        authorizer: null,
        httpMethod: 'POST',
        identity: {
            accessKey: '',
            accountId: '',
            apiKey: '',
            apiKeyId: '',
            caller: '',
            cognitoAuthenticationProvider: '',
            cognitoAuthenticationType: '',
            cognitoIdentityId: '',
            cognitoIdentityPoolId: '',
            principalOrgId: '',
            sourceIp: '',
            user: '',
            userAgent: '',
            userArn: ''
        },
        path: '',
        protocol: '',
        requestId: '',
        requestTimeEpoch: 0,
        resourceId: '',
        resourcePath: '',
        stage: ''
    },
    resource: '',
    stageVariables: null
}

handler(apiGatewayEvent)
