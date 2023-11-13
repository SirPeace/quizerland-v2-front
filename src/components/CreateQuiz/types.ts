import { object, string } from 'zod'

import type { z } from 'zod'

export const quizFormSchema = object({
  title: string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(100, 'Название не может иметь более 100 символов!'),
  description: string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(500, 'Описание не может иметь более 500 символов!'),
  questions: object({
    text: string()
      .min(1, 'Поле обязательное для заполнения!')
      .max(100, 'Вопрос не может содержать более 100 символов!'),
    // TODO: Перевести на тип number().int()
    rightAnswerId: string({
      errorMap: () => ({ message: 'Выберите вариант ответа' }),
    })
      .regex(/^\d+$/, { message: 'Выберите вариант ответа' })
      .optional(),
    answers: string()
      .min(1, 'Поле обязательное для заполнения!')
      .max(70, 'Ответ не может сдержать более 70 символов!')
      .array(),
  }).array(),
})

// Типы сущностей, хранимые в RHF
export type TQuizForm = z.infer<typeof quizFormSchema>

// Все типы ниже - для удобства, чтобы не городить преобразования типов в компонентах
export type TQuestionSchema = TQuizForm['questions'][0]

// типы для доступа к полям RHF
export type QuestionKey = `questions.${number}.${keyof TQuestionSchema}`
export type AnswerKey = `questions.${number}.answers.${number}`
