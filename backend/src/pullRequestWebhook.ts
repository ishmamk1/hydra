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


export const handler = async ( event: APIGatewayProxyEvent ): Promise<void> => {
    try {
        // log event

        // format the event to a ddb type

        // push to firebase

        


    } catch (error) {
        console.error(error);
        throw error;
    }
};