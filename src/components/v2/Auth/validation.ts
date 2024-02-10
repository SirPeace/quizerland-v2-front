import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Введите email').min(1, 'Введите email'),
  password: z.string().min(1, 'Введите пароль'),
})
export type TSignInSchema = z.infer<typeof signInSchema>

export const registrationSchema = z
  .object({
    nickname: z
      .string()
      .min(1, 'Поле обязательное для заполнения')
      .max(20, 'Псевдоним не может содержать больше 20 символов'),
    email: z
      .string()
      .min(1, 'Поле обязательное для заполнения')
      .email('Введите корректный email адрес'),
    password: z
      .string()
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .max(32, 'Пароль не может иметь более 32 символов'),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли должны совпадать!',
    path: ['confirmPassword'],
  })
export type TRegistrationSchema = z.infer<typeof registrationSchema>

export type TUserRegistrationData = Omit<TRegistrationSchema, 'confirmPassword'>
