import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const headers = {
  'Content-Type': 'application/json'
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!'
    }),
    headers: headers
  };
};