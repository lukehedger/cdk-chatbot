import { CfnSlackChannelConfiguration } from "@aws-cdk/aws-chatbot";
import {
  Effect,
  ManagedPolicy,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "@aws-cdk/aws-iam";
import { Construct, Stack, StackProps } from "@aws-cdk/core";

export class CdkChatbotStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const awsChatbotNotificationsOnlyCommandsPolicy = new PolicyDocument({
      assignSids: true,
      statements: [
        new PolicyStatement({
          actions: [
            "cloudwatch:Describe*",
            "cloudwatch:Get*",
            "cloudwatch:List*",
          ],
          effect: Effect.ALLOW,
          resources: ["*"],
        }),
      ],
    });

    const awsChatbotReadOnlyCommandsPolicy = new PolicyDocument({
      assignSids: true,
      statements: [
        new PolicyStatement({
          actions: [
            "iam:*",
            "s3:GetBucketPolicy",
            "ssm:*",
            "sts:*",
            "kms:*",
            "cognito-idp:GetSigningCertificate",
            "ec2:GetPasswordData",
            "ecr:GetAuthorizationToken",
            "gamelift:RequestUploadCredentials",
            "gamelift:GetInstanceAccess",
            "lightsail:DownloadDefaultKeyPair",
            "lightsail:GetInstanceAccessDetails",
            "lightsail:GetKeyPair",
            "lightsail:GetKeyPairs",
            "redshift:GetClusterCredentials",
            "storagegateway:DescribeChapCredentials",
          ],
          effect: Effect.DENY,
          resources: ["*"],
        }),
      ],
    });

    const chatOpsIAMRole = new Role(this, "AWSChatbot-role", {
      assumedBy: new ServicePrincipal("chatbot.amazonaws.com"),
      description: "AWS Chatbot Execution Role",
      inlinePolicies: {
        "AWS-Chatbot-NotificationsOnly-Policy": awsChatbotNotificationsOnlyCommandsPolicy,
        "AWS-Chatbot-ReadOnlyCommands-Policy": awsChatbotReadOnlyCommandsPolicy,
      },
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName("CloudWatchReadOnlyAccess"),
        ManagedPolicy.fromAwsManagedPolicyName("ReadOnlyAccess"),
      ],
      roleName: "AWSChatbot-role",
    });

    new CfnSlackChannelConfiguration(this, "ChatOps", {
      configurationName: "ChatOps",
      iamRoleArn: chatOpsIAMRole.roleArn,
      loggingLevel: "INFO",
      slackChannelId: "C010KLXNCG6",
      slackWorkspaceId: "T3U1RJVMK",
      snsTopicArns: [
        "arn:aws:sns:eu-west-2:614517326458:ApplicationAlertsTopic-Production",
      ],
    });
  }
}
