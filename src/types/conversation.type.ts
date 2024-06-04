import { z } from "zod";
import { jobSchema } from "@/types/job.type";

const conversationSchema = z.object({
  conversationId: z.string(),
  conversationTitle: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  job: jobSchema,
});

type Conversation = z.infer<typeof conversationSchema>;

export { conversationSchema };

export type { Conversation };
