export interface IQuizFormState {
  id?: number
  quizDescription: IQuizDescription
  questions: IQuestionForm[]
}

export interface IQuizDescription {
  title: string
  description: string
}

export interface IQuestionForm {
  title: string
  rightAnswerId: number
  answers: IQuestionFormAnswer[]
}

export interface IQuestionFormAnswer {
  text: string
}
