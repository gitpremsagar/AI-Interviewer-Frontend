import { z } from "zod";

const userSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .transform((val) => val.trim()),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .transform((val) => val.trim()),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .transform((val) => val.trim()),
  //   createdAt: z.date(),
  //   updatedAt: z.date(),
});

type User = z.infer<typeof userSchema>;

export { userSchema };

export type { User };
