import Anthropic from "@anthropic-ai/sdk";
import { Messages } from "../types.js";
import { BaseLlm, LlmResponse } from "./Base.js";
import { TextBlock } from "@anthropic-ai/sdk/resources";

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return client;
}

export class Claude extends BaseLlm {
  static async chat(model: string, messages: Messages): Promise<LlmResponse> {
    const clientInstance = getClient();
    const response = await clientInstance.messages.create({
      max_tokens: 2048,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      model: model,
    });

    return {
      outputTokensConsumed: response.usage.output_tokens,
      inputTokensConsumed: response.usage.input_tokens,
      completions: {
        choices: response.content.map((content: any) => ({
          message: {
            content: (content as TextBlock).text,
          },
        })),
      },
    };
  }
}
