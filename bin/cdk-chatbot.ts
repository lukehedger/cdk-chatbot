#!/usr/bin/env node
import { App } from "@aws-cdk/core";
import { CdkChatbotStack } from "../lib/cdk-chatbot";

const app = new App();

new CdkChatbotStack(app, "CdkChatbot");
