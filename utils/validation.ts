import { z } from "zod"

export const productSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  description: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
  thumbnail: z.url("Thumbnail deve ser uma URL válida"),
})

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
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
