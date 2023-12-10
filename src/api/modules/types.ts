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
    id: string
    title: string
    description: string
    questions: Array<{
      text: string
      rightAnswerIndex: number
      answers: string[]
    }>
  }
  progress: IProgressResponse
}

export interface IProgressResponse {
  id: string
  currentQuestionIndex: number
  rightAttempts: number
  isFinished: boolean
}

export interface IProgressRequest {
  currentQuestionIndex: number
  rightAttempts: number
  isFinished: boolean
  progressId: string
  quizId: string
}

export interface IProgressDelete {
  progressId: number
}
