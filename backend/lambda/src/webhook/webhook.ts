import { config } from 'dotenv';
config();

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const headers = {
    'Content-Type': 'application/json'
}

const sqs_client = new SQSClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
})


export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  // TODO: add possible filtering and extra stuff
  try {
    const body = event.body ? JSON.parse(event.body) : null;
    console.log(body);

    if (body) {
      await sqs_client.send(new SendMessageCommand({
        QueueUrl: "http://localhost:4566/000000000000/webhook-queue",
        MessageBody: JSON.stringify(body),
      }));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'webhook recieved',
        data: body,
      }, null, 2),
      headers: headers
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }
};