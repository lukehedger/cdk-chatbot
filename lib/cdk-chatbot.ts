import { CfnSlackChannelConfiguration } from "@aws-cdk/aws-chatbot";
import { Construct, Stack, StackProps } from "@aws-cdk/core";

export class CdkChatbotStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new CfnSlackChannelConfiguration(this, "ChatOps", {
      configurationName: "ChatOps",
      iamRoleArn: "IAM_ROLE_ARN",
      loggingLevel: "INFO",
      slackChannelId: "SLACK_CHANNEL_ID",
      slackWorkspaceId: "SLACK_WORKSPACE_ID",
      snsTopicArns: ["SNS_TOPIC_ARN"],
    });
  }
}
