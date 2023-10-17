export interface ICreateQuizState {
  title: string
  description: string
  questions: IQuestion[]
}

export interface IQuestion {
  id: number
  text: string
  correctAnswerId?: number
  answers: IAnswerTemplate[]
}

export interface IAnswerTemplate {
  id: number
  text?: string
}
