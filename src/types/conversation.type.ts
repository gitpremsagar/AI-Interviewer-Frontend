import { z } from "zod";

const conversationSchema = z.object({
  conversationId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
});

type Conversation = z.infer<typeof conversationSchema>;

export { conversationSchema };

export type { Conversation };
