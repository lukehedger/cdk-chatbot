import "@aws-cdk/assert/jest";
import { App } from "@aws-cdk/core";
import { CdkChatbotStack } from "../cdk-chatbot";

let stack: CdkChatbotStack;

beforeAll(() => {
  const app = new App();

  stack = new CdkChatbotStack(app, "CdkChatbot");
});

test("Stack has no resources", () => {
  expect(stack).toHaveResource("AWS::Chatbot::SlackChannelConfiguration", {
    ConfigurationName: "ChatOps",
    IamRoleArn: "IAM_ROLE_ARN",
    SlackChannelId: "SLACK_CHANNEL_ID",
    SlackWorkspaceId: "SLACK_WORKSPACE_ID",
    LoggingLevel: "INFO",
    SnsTopicArns: ["SNS_TOPIC_ARN"],
  });
});
