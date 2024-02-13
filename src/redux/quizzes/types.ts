import type { IQuizzesItem } from '@/api/modules/types'

export interface IQuizzesState {
  quizzesTotalCount: null | number
  quizzes: IQuizzesItem[]
}

export interface ISetQuizzesPayload {
  quizzes: IQuizzesItem[]
  totalCount: number
}
