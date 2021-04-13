import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as lambda from "@aws-cdk/aws-lambda";
import { PythonFunction } from "@aws-cdk/aws-lambda-python";

export class CdklambdaInsightXrayStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const PREFIX_NAME = id.toLowerCase().replace('stack','')

    // activate Lambda Insight

    const role = new iam.Role(this, "role", {
      roleName: PREFIX_NAME + "-role",
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("CloudWatchLambdaInsightsExecutionRolePolicy")
      ]
    })
    
    const layer = lambda.LayerVersion.fromLayerVersionArn(this, "layer", 
      "arn:aws:lambda:ap-northeast-1:580247275435:layer:LambdaInsightsExtension:14"
    )

    const lambda_function = new PythonFunction(this, "lambda_function", {
      entry: "lambda",
      index: "index.py",
      handler: "lambda_handler",
      functionName: PREFIX_NAME + '-function',
      runtime: lambda.Runtime.PYTHON_3_8,
      timeout: cdk.Duration.seconds(1),
      role: role,
      layers: [ layer ], // add Lambda Insight
      tracing: lambda.Tracing.ACTIVE // activate X-Ray
    })
  }
}
