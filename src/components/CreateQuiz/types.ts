import z from 'zod'

export const descriptionSchema = z.object({
  name: z
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(100, 'Название не может иметь более 100 символов!'),
  description: z
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(500, 'Описание не может иметь более 500 символов!'),
})
export type TDescriptionSchema = z.infer<typeof descriptionSchema>
