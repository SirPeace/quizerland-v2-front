import z from 'zod'

export const descriptionSchema = z.object({
  title: z
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(100, 'Название не может иметь более 100 символов!'),
  description: z
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(500, 'Описание не может иметь более 500 символов!'),
})
export type TDescriptionSchema = z.infer<typeof descriptionSchema>

export const questionSchema = z.object({
  question: z
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(100, 'Вопрос не может содержать более 100 символов!'),
  answers: z
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(70, 'Ответ не может сдержать более 70 символов!')
    .array(),
  rightAnswerId: z
    .string({ errorMap: () => ({ message: 'Выберите вариант ответа' }) })
    .regex(/^\d+$/, { message: 'Выберите вариант ответа' }),
})
export type TQuestionSchema = z.infer<typeof questionSchema>
