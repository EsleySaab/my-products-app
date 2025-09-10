import { z } from "zod"

export const productSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z
    .string()
    .min(5, "A descrição deve ter pelo menos 5 caracteres"),
  thumbnail: z
    .any()
    .refine((files) => files?.length > 0, "A thumbnail é obrigatória"),
})

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    verifyPassword: z.string().min(6, "Confirmação obrigatória"),
    phone: z.object({
      country: z.string().min(1, "País obrigatório"),
      ddd: z.string().min(1, "DDD obrigatório"),
      number: z.string().min(8, "Número inválido"),
    }),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "As senhas não coincidem",
    path: ["verifyPassword"],
  })
