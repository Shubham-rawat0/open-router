import { BaseLlm, LlmResponse } from "./Base.js";
import { Messages } from "../types.js";

export class DeepSeek extends BaseLlm {
  static async chat(model: string, messages: Messages): Promise<LlmResponse> {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    const data = await response.json();
    console.log("raw",data)

    return {
      completions: {
        choices: [
          {
            message: {
              content: data.choices[0].message.content,
            },
          },
        ],
      },
      inputTokensConsumed: data.usage.prompt_tokens,
      outputTokensConsumed: data.usage.completion_tokens,
    };
  }
}
