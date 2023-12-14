import zod from 'zod'

export const quizDescriptionFormSchema = zod.object({
  title: zod
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(100, 'Название не может иметь более 100 символов!'),
  description: zod
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(500, 'Описание не может иметь более 500 символов!'),
})

export const questionFormSchema = zod.object({
  title: zod
    .string()
    .min(1, 'Поле обязательное для заполнения!')
    .max(100, 'Вопрос не может содержать более 100 символов!'),
  rightAnswerId: zod
    .number({ errorMap: () => ({ message: 'Выберите вариант ответа' }) })
    .int()
    .default(0),
  answers: zod
    .object({
      text: zod
        .string()
        .min(1, 'Поле обязательное для заполнения!')
        .max(70, 'Ответ не может сдержать более 70 символов!'),
    })
    .array(),
})

// Типы сущностей, хранимые в RHF
export type TQuizDescriptionForm = zod.infer<typeof quizDescriptionFormSchema>
export type TQuestionForm = zod.infer<typeof questionFormSchema>

// type TQuizSchema = {
//   title: string;
//   description: string;
//   questions: {
//       text: string;
//       answers: string[];
//       rightAnswerIndex?: number | undefined;
//   }[];
// }
