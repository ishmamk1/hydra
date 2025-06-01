import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const headers = {
  'Content-Type': 'application/json'
};

const sqs_client = new SQSClient({
  region: "us-east-1",
  endpoint: "http://host.docker.internal:4566",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test"
  }
})

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  await sqs_client.send(new SendMessageCommand({
    QueueUrl: "http://localhost:4566/000000000000/webhook-queue",
    MessageBody: JSON.stringify({ event: "test"}),
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!'
    }),
    headers: headers
  };
};