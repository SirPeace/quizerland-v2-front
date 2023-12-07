export interface IGetQuizResponse {
  quizzes: IQuizzesItem[]
  quizzesTotalCount: number
}

export interface IQuizzesResponse {
  quizzes: IQuizzesItem[]
  quizzesTotalCount: number
}

export interface IQuizzesItem {
  questionsCount: number
  title: string
  description: string
  userId: string
  id: string
}

export interface IQuizResponse {
  quizItem: {
    _id: string
    userId: string
    title: string
    description: string
    questions: Array<{
      text: string
      rightAnswerIndex: number
      answers: string[]
    }>
    createdAt: string
    updatedAt: string
  }
  progress: IProgressResponse
}

export interface IProgressResponse {
  _id: string
  quizId: string
  userId: string
  currentQuestionIndex: number
  rightAttempts: number
  isFinished: boolean
  createdAt: string
  updatedAt: string
}

export interface IProgressRequest {
  currentQuestionIndex: number
  rightAttempts: number
  isFinished: boolean
  progressId: string
  quizId: string
}
