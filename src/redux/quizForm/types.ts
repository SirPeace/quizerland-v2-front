export interface IQuizFormState {
  id?: number
  quizDescription: IQuizDescriptionForm
  questions: IQuestionForm[]
}

// ==============================
//      QUIZ DESCRIPTION FORM
// ==============================
export interface IQuizDescriptionForm {
  title: string
  description: string
  errors: TQuizDescriptionFormErrors
}

type TQuizDescriptionFormErrorKeys = Exclude<
  keyof IQuizDescriptionForm,
  'errors'
>

export type TQuizDescriptionFormErrors = Partial<
  Record<TQuizDescriptionFormErrorKeys, string>
>

// ==============================
//         QUESTION FORM
// ==============================
export interface IQuestionForm {
  title: string
  rightAnswerId: number
  answers: IQuestionFormAnswer[]
  errors: TQuestionFormErrors
}

type TQuestionFormErrorKeys =
  | Exclude<keyof IQuestionForm, 'errors' | 'answers'>
  | `answers.${number}.text`

export type TQuestionFormErrors = Partial<
  Record<TQuestionFormErrorKeys, string>
>

export interface IQuestionFormAnswer {
  text: string
}
