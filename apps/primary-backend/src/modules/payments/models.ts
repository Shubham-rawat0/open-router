import { z } from "zod";

export const OnrampResponseSchema = z.object({
  message: z.literal("Onramp successful"),
  credits: z.number().int().nonnegative(),
});


export const OnrampFailedResponseSchema = z.object({
  message: z.literal("Onramp failed"),
});


export type OnrampResponse = z.infer<typeof OnrampResponseSchema>;
export type OnrampFailedResponse = z.infer<typeof OnrampFailedResponseSchema>;
