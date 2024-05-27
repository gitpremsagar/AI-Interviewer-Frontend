import { z } from 'zod';

const partSchema = z.object({
  text: z.string(),
});

const rollSchema = z.enum(["user", "model"]);

const historySchema = z.array(
  z.object({
    role: rollSchema,
    parts: z.array(partSchema),
  })
);

type Part = z.infer<typeof partSchema>;
type History = z.infer<typeof historySchema>;
type Role = z.infer<typeof rollSchema>;

export { historySchema, partSchema, rollSchema };

export type { Part, History, Role};