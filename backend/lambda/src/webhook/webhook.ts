import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  const parsed_payload = JSON.parse(event.body || '{}');
  console.log(parsed_payload);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'webhook recieved',
      data: parsed_payload,
    }, null, 2),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};