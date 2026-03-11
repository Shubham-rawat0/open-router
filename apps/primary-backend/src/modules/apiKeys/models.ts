import { z } from "zod";

export namespace ApiKeyModel {

  export const createApiKeySchema = z.object({
    name: z.string(),
  });

  export type CreateApiKeySchema = z.infer<typeof createApiKeySchema>;

  export const createApiKeyResponse = z.object({
    id: z.string(),
    apiKey: z.string(),
  });

  export type CreateApiKeyResponse = z.infer<typeof createApiKeyResponse>;


  export const updateApiKeySchema = z.object({
    id: z.string(),
    disabled: z.boolean(),
  });

  export type UpdateApiKeySchema = z.infer<typeof updateApiKeySchema>;

  export const updateApiKeyResponseSchema = z.object({
    message: z.literal("Updated api key successfully"),
  });

  export const disableApiKeyResponseFailedSchema = z.object({
    message: z.literal("Updating api key unsuccessful"),
  });


  export const getApiKeysResponseSchema = z.object({
    apiKeys: z.array(
      z.object({
        id: z.string(),
        apiKey: z.string(),
        name: z.string(),
        credisConsumed: z.number(),
        lastUsed: z.date().nullable(),
        disabled: z.boolean(),
      }),
    ),
  });



  export const deleteApiKeyResponseSchema = z.object({
    message: z.literal("Api key deleted successfully"),
  });

  export const deleteApiKeyResponseFailedSchema = z.object({
    message: z.literal("Api key deletetion failed"),
  });
}
