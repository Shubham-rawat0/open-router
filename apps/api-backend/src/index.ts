import "dotenv/config";
import express from "express";
import { prisma } from "db";
import { Gemini } from "./llms/Gemini.js";
import { OpenAi } from "./llms/OpenAi.js";
import { Claude } from "./llms/Claude.js";
import { LlmResponse } from "./llms/Base.js";
import { DeepSeek } from "./llms/Deepseek.js";

const app = express();

app.use(express.json());

app.get("/lol", (req, res) => {
  res.status(200).json("hello");
});

app.post("/api/v1/chat/completions", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Missing Authorization header",
      });
    }

    const apiKey = authHeader.replace("Bearer ", "");

    const body = req.body;
    const model = body.model;

    const [_companyName, providerModelName] = model.split("/");

    const apiKeyDb = await prisma.apiKey.findFirst({
      where: {
        apiKey,
        disabled: false,
        deleted: false,
      },
      select: {
        user: true,
      },
    });

    if (!apiKeyDb) {
      return res.status(403).json({
        message: "Invalid api key",
      });
    }

    if (apiKeyDb.user.credits <= 0) {
      return res.status(403).json({
        message: "You dont have enough credits in your db",
      });
    }

    const modelDb = await prisma.model.findFirst({
      where: {
        slug: model,
      },
    });

    if (!modelDb) {
      return res.status(403).json({
        message: "This is an invalid model we dont support",
      });
    }

    const providers = await prisma.modelProviderMapping.findMany({
      where: {
        modelId: modelDb.id,
      },
      include: {
        provider: true,
      },
    });

    const provider = providers[Math.floor(Math.random() * providers.length)];

    let response: LlmResponse | null = null;

    if (provider.provider.name === "Google API") {
      response = await Gemini.chat(providerModelName, body.messages);
    }

    if (provider.provider.name === "Google Vertex") {
      response = await Gemini.chat(providerModelName, body.messages);
    }

    if (provider.provider.name === "OpenAI") {
      response = await OpenAi.chat(providerModelName, body.messages);
    }

    if (provider.provider.name === "DeepSeek") {
      response = await DeepSeek.chat(providerModelName, body.messages);
    }

    if (provider.provider.name === "Claude API") {
      response = await Claude.chat(providerModelName, body.messages);
    }

    if (!response) {
      return res.status(403).json({
        message: "No provider found for this model",
      });
    }

    const creditsUsed =
      (response.inputTokensConsumed * provider.inputTokenCost +
        response.outputTokensConsumed * provider.outputTokenCost) /
      10;

    console.log(creditsUsed);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: apiKeyDb.user.id },
        data: {
          credits: {
            decrement: creditsUsed,
          },
        },
      }),

      prisma.apiKey.update({
        where: { apiKey },
        data: {
          creditsConsumed: {
            increment: creditsUsed,
          },
        },
      }),
    ]);
    
    return res.json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
  console.log("Ready to accept requests");
});

// Keep event loop alive
setInterval(() => {
  // Empty interval to keep process running
}, 30000);

// Handle unhandled errors
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle process exit
process.on("exit", (code) => {
  console.log("Process exiting with code:", code);
});
