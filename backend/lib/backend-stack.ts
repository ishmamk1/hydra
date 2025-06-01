import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BackendStack extends cdk.Stack {
  public readonly webhookQueue: sqs.Queue;


  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const webhookQueue = new sqs.Queue(this, 'webhookQueue', {
      queueName: 'webhook-queue',
      visibilityTimeout: cdk.Duration.seconds(30),
    });
    
    const apiGateway = new apigateway.RestApi(this, "hydraAPI", {
      restApiName: "Hydra",
    });

    const helloFunction = new lambda.Function(this, "HelloFunction", {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'hello.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, "../lambda/dist")),
    });


    // hello method
    const helloResource = apiGateway.root.addResource("hello");
    helloResource.addMethod("GET", new apigateway.LambdaIntegration(helloFunction, {
      integrationResponses: [{
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': "'*'"
        },
        responseTemplates: { 'application/json': '' }
      }]
    }), {
      methodResponses: [{
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': true
        }
      }]
    });
  }
}
