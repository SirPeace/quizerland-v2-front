import { z } from 'zod'

export const singInSchema = z.object({
  email: z
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .email('Электронная почта имеет невалидное значение!'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать не менее 8 символов!')
    .max(32, 'Пароль не может иметь более 32 символов!'),
})
export type TSingInSchema = z.infer<typeof singInSchema>

export const registrationSchema = z
  .object({
    nickname: z
      .string()
      .min(1, 'Поле обязательное для заполнения!')
      .max(20, 'Псевдоним не может содержать больше 20 символов!'),
    email: z
      .string()
      .min(1, 'Поле обязательное для заполнения!')
      .email('Электронная почта имеет невалидное значение!'),
    password: z
      .string()
      .min(8, 'Пароль должен содержать не менее 8 символов!')
      .max(32, 'Пароль не может иметь более 32 символов!'),
    confirmPassword: z
      .string()
      .min(1, 'Поле проверки пароля не может быть пустым!'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли должны совпадать!',
    path: ['confirmPassword'],
  })
export type TRegistrationSchema = z.infer<typeof registrationSchema>

export type TUserRegistrationData = Omit<TRegistrationSchema, 'confirmPassword'>
