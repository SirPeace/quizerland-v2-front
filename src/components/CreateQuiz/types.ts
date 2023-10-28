import zod from 'zod'

export const quizFormSchema = zod.object({
  title: zod
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(100, 'Название не может иметь более 100 символов!'),
  description: zod
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(500, 'Описание не может иметь более 500 символов!'),
  questions: zod
    .object({
      text: zod
        .string()
        .min(1, 'Поле обязательное для заполнения!')
        .max(100, 'Вопрос не может содержать более 100 символов!'),
      // TODO: Перевести на тип number().int()
      rightAnswerId: zod
        .string({ errorMap: () => ({ message: 'Выберите вариант ответа' }) })
        .regex(/^\d+$/, { message: 'Выберите вариант ответа' })
        .optional(),
      answers: zod
        .string()
        .min(1, 'Поле обязательное для заполнения!')
        .max(70, 'Ответ не может сдержать более 70 символов!')
        .array(),
    })
    .array(),
})

// Типы сущностей, хранимые в RHF
export type TQuizForm = zod.infer<typeof quizFormSchema>

// Все типы ниже - для удобства, чтобы не городить преобразования типов в компонентах
export type TQuestionSchema = TQuizForm['questions'][0]

// Описали типы для доступа к полям RHF
// Можешь воспользоваться поиском, чтобы увидеть где это используется (или специально налажать, чтобы TS подсветил ошибки)
export type QuestionKey = `questions.${number}.${keyof TQuestionSchema}`
export type AnswerKey = `questions.${number}.answers.${number}`
