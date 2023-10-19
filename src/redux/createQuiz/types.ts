export interface ICreateQuizState {
  title: string
  description: string
  questions: IQuestionTemplate[]
}

export interface IQuestionTemplate {
  id: number
  text: string
  correctAnswerId?: number
  answers: IAnswerTemplate[]
}

export interface IAnswerTemplate {
  id: number
  text?: string
}
