import { Router, Request, Response } from "express";
import { PaymentsService } from "./service.js";
import { OnrampResponseSchema, OnrampFailedResponseSchema } from "./models.js";
import { authMiddleware } from "../../middleware/authMidlleware.js";


export const paymentsRouter = Router();

paymentsRouter.use(authMiddleware);


paymentsRouter.post("/onramp", async (req: Request, res: Response) => {
  try {
    const userId = Number((req as any).userId);

    const credits = await PaymentsService.onramp(userId);

    const validated = OnrampResponseSchema.parse({
      message: "Onramp successful",
      credits,
    });

    return res.status(200).json(validated);
  } catch (error) {
    const failed = OnrampFailedResponseSchema.parse({
      message: "Onramp failed",
    });

    return res.status(411).json(failed);
  }
});
