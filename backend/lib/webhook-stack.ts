import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as stackConfig from './config/stack-config';

export class WebhookStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Configurable params
    const apiName = 'webhook';
    const lambdaHandler = 'webhook.handler';
    const lambdaRuntime = lambda.Runtime.NODEJS_22_X;
    const lambdaCodePath = path.join(__dirname, '../lambda/dist');
    const lambdaFunctionName = 'WebhookReceiverFunction';
    const webhookPath = 'webhook';

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
