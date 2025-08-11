import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'github-webhook-lambda',
    brokers: ['localhost:9092'], 
});

const producer = kafka.producer();

export const handler = async ( event: any ) => {
    try {
        // log event

        // format the event to a ddb type

        // push to firebase
        console.log("Received event:", JSON.stringify(event, null, 2));

        const webhookEventResult = JSON.parse(event);

        // Map to kafka message

        // try to push it or return error

        // make a write to a db with the extra info


        


        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Hello from Lambda!' }),
        };

    
    } catch (error) {
        console.error(error);
        throw error;
    }
};