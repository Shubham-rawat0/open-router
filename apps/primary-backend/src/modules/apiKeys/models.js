import { z } from "zod";
export var ApiKeyModel;
(function (ApiKeyModel) {
    ApiKeyModel.createApiKeySchema = z.object({
        name: z.string(),
    });
    ApiKeyModel.createApiKeyResponse = z.object({
        id: z.string(),
        apiKey: z.string(),
    });
    ApiKeyModel.updateApiKeySchema = z.object({
        id: z.string(),
        disabled: z.boolean(),
    });
    ApiKeyModel.updateApiKeyResponseSchema = z.object({
        message: z.literal("Updated api key successfully"),
    });
    ApiKeyModel.disableApiKeyResponseFailedSchema = z.object({
        message: z.literal("Updating api key unsuccessful"),
    });
    ApiKeyModel.getApiKeysResponseSchema = z.object({
        apiKeys: z.array(z.object({
            id: z.string(),
            apiKey: z.string(),
            name: z.string(),
            credisConsumed: z.number(),
            lastUsed: z.date().nullable(),
            disabled: z.boolean(),
        })),
    });
    ApiKeyModel.deleteApiKeyResponseSchema = z.object({
        message: z.literal("Api key deleted successfully"),
    });
    ApiKeyModel.deleteApiKeyResponseFailedSchema = z.object({
        message: z.literal("Api key deletetion failed"),
    });
})(ApiKeyModel || (ApiKeyModel = {}));
