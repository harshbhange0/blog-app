import { z } from "zod";
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export interface Post {
  authorId?: string;
  content?: string;
  createdAt?: string;
  id?: string;
  published?: boolean;
  title?: string;
  updateAt?: string;
}
export type registerInput = z.infer<typeof registerSchema>;
export type registerOutput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type LoginOutput = z.infer<typeof loginSchema>;
