import { z } from "zod";

const passwordSchema = z
  .string()
  .min(4, { error: "Введите корректный пароль" });

export const formLoginSchema = z.object({
  email: z.email({ error: "Ввелите корректный Email" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .extend({
    fullName: z.string().min(4, { error: "Введите имя и фамилию" }),
    confirmPassword: z.string().min(4, { error: "Повторите введёный пароль" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Пароли не совподают",
    path: ["confirmPassword"],
  });

export type TLoginFoformLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
