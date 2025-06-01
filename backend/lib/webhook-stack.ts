import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as stackConfig from './config/stack-config';
import * as sqs from 'aws-cdk-lib/aws-sqs';

interface WebhookStackProps extends cdk.StackProps {
    webhookQueue: sqs.Queue;
}

export class WebhookStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WebhookStackProps) {
    super(scope, id, props);

    const apiName = 'webhook';
    const lambdaHandler = 'webhook.handler';
    const lambdaRuntime = lambda.Runtime.NODEJS_22_X;
    const lambdaCodePath = path.join(__dirname, '../lambda/dist');
    const lambdaFunctionName = 'WebhookReceiverFunction';
    const webhookPath = 'webhook';

    const queue = props.webhookQueue;

    const api = new apigateway.RestApi(this, 'WebhookAPI', {
      restApiName: apiName,
    });

    const webhookLambda = new lambda.Function(this, lambdaFunctionName, {
      runtime: lambdaRuntime,
      handler: lambdaHandler,
      code: lambda.Code.fromAsset(lambdaCodePath),
    });

    const webhookResource = api.root.addResource(webhookPath);

    webhookResource.addMethod('POST', new apigateway.LambdaIntegration(webhookLambda, {
      integrationResponses: stackConfig.integration_responses
    }), {
      methodResponses: stackConfig.method_responses
    });
  }
}
