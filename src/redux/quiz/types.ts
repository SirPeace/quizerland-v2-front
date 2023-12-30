export interface IQuiz {
  currentQuestionIndex: number
  rightAttempts: number
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
  correctAnswerIndex: number
  answers: IAnswer[]
}

export interface IAnswer {
  id: number
  text: string
}
