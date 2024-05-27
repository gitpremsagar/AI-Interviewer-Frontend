import { z } from "zod";

const messageSchema = z.object({
  messageId: z.string(),
  conversationId: z.string(),
  sender: z.string(),
  message: z.string(),
  //   createdAt: z.date(),
});

type Message = z.infer<typeof messageSchema>;

export { messageSchema };

export type { Message };
