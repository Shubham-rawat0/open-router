import { Router, Request, Response, NextFunction } from "express";
import { ModelsService } from "./service.js";

export const modelsRouter = Router();

modelsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const models = await ModelsService.getModels();
      return res.status(200).json({ models });
    } catch (error) {
      next(error);
    }
  },
);


modelsRouter.get(
  "/providers",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const providers = await ModelsService.getProviders();
      return res.status(200).json({ providers });
    } catch (error) {
      next(error);
    }
  },
);

modelsRouter.get(
  "/:id/providers",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const modelId = Number(req.params.id);

      if (isNaN(modelId)) {
        return res.status(400).json({ message: "Invalid model id" });
      }

      const providers = await ModelsService.getModelProviders(modelId);

      return res.status(200).json({ providers });
    } catch (error) {
      next(error);
    }
  },
);
