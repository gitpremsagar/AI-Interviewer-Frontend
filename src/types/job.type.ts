import { z } from "zod";

const jobSchema = z.object({
  id: z.string(),
  jobTitle: z.string(),
  jobDescription: z.string(),
  company: z.string(),
  location: z.string(),
  //   createdAt: z.date(),
  //   updatedAt: z.date()
});

type Job = z.infer<typeof jobSchema>;

export { jobSchema };

export type { Job };
