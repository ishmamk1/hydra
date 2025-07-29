import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const headers = {
    'Content-Type': 'application/json'
}


export const handler = async ( event: APIGatewayProxyEvent ) => {
    try {
        // log event

        // format the event to a ddb type

        // push to firebase
        console.log("Received event:", JSON.stringify(event, null, 2));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Hello from Lambda!' }),
        };

    
    } catch (error) {
        console.error(error);
        throw error;
    }
};