import { Messages } from "../types.js";
import { BaseLlm, LlmResponse } from "./Base.js";
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!ai) {
    ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });
  }
  return ai;
}

export class Gemini extends BaseLlm {
  static async chat(model: string, messages: Messages): Promise<LlmResponse> {
    const aiInstance = getClient();
    const response = await aiInstance.models.generateContent({
      model: model,
      contents: messages.map((message: any) => ({
        text: message.content,
        role: message.role,
      })),
    });

    return {
      outputTokensConsumed: response.usageMetadata?.candidatesTokenCount!,
      inputTokensConsumed: response.usageMetadata?.promptTokenCount!,
      completions: {
        choices: [
          {
            message: {
              content: response.text!,
            },
          },
        ],
      },
    };
  }
}
