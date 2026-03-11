import { z } from "zod";

export const MessagesSchema = z.array(
  z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  }),
);

export type Messages = z.infer<typeof MessagesSchema>;

export const ConversationSchema = z.object({
  model: z.string(),
  messages: MessagesSchema,
});

export type Conversation = z.infer<typeof ConversationSchema>;
