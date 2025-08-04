import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      // Create API GATEWAY
      const apiGateway = new apigateway.RestApi(this, "WebhookAPI", {
        restApiName: "WebhookAPI",
        description: "API Gateway to establish Github Webhook connection to Hydra"
      })

      // CREATE LAMBDA INSTANCE
      const pullRequestWebhookHandler = new lambda.Function(this, "PullRequestWebhook", {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "pullRequestWebhook.handler",
        code: lambda.Code.fromAsset(path.join("dist")),
        timeout: cdk.Duration.minutes(15)
      });

      // WEBHOOK Endpoint
      const webhook = apiGateway.root.addResource('webhook');
      webhook.addMethod('POST', new apigateway.LambdaIntegration(pullRequestWebhookHandler));
  }
};
