import { Router } from "express";
import { ApiKeyModel } from "./models.js";
import { ApiKeyService } from "./service.js";
import { authMiddleware } from "../../middleware/authMidlleware.js";
const router = Router();
router.post("/", authMiddleware, async (req, res) => {
    const parsed = ApiKeyModel.createApiKeySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json(parsed.error);
    }
    const result = await ApiKeyService.createApiKey(parsed.data.name, Number(req.userId));
    return res.json(ApiKeyModel.createApiKeyResponse.parse(result));
});
router.get("/", authMiddleware, async (req, res) => {
    const apiKeys = await ApiKeyService.getApiKeys(Number(req.userId));
    return res.json(ApiKeyModel.getApiKeysResponseSchema.parse({ apiKeys }));
});
router.put("/", authMiddleware, async (req, res) => {
    const parsed = ApiKeyModel.updateApiKeySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json(parsed.error);
    }
    try {
        await ApiKeyService.updateApiKeyDisabled(Number(parsed.data.id), Number(req.userId), parsed.data.disabled);
        return res.json(ApiKeyModel.updateApiKeyResponseSchema.parse({
            message: "Updated api key successfully",
        }));
    }
    catch {
        return res.status(411).json(ApiKeyModel.disableApiKeyResponseFailedSchema.parse({
            message: "Updating api key unsuccessful",
        }));
    }
});
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await ApiKeyService.delete(Number(req.params.id), Number(req.userId));
        return res.json(ApiKeyModel.deleteApiKeyResponseSchema.parse({
            message: "Api key deleted successfully",
        }));
    }
    catch {
        return res.status(411).json(ApiKeyModel.deleteApiKeyResponseFailedSchema.parse({
            message: "Api key deletetion failed",
        }));
    }
});
export default router;
