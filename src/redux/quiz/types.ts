export interface IQuiz {
  currentQuestionIndex: number
  rightAttempts: number | null
  isFinished: boolean

  id: string | undefined
  userId: string | undefined
  title: string | undefined
  description: string | undefined
  questions: IQuestion[]
}

export interface IQuestion {
  id: number
  text: string
  correctAnswerId: number
  answers: IAnswer[]
}

export interface IAnswer {
  id: number
  text: string
}
