import type { IQuizzesItem } from '@/redux/quizzes/types'

export interface IGetQuizResponse {
  quizzes: IQuizzesItem[]
  quizzesTotalCount: number
}

export interface IQuizResponse {
  _id: string
  userId: string
  title: string
  description: string
  questions: Array<{
    text: string
    rightAnswerId: string
    answers: string[]
  }>
  createdAt: string
  updatedAt: string
}
