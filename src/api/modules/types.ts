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
