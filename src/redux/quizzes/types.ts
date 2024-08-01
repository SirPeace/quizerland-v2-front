import type { IQuizzesItem } from '@/api/modules/types'

export interface IQuizzesState {
  currentChunk: null | number
  quizzesTotalCount: null | number
  quizzes: IQuizzesItem[]
}

export interface ISetQuizzesPayload {
  quizzes: IQuizzesItem[]
  totalCount: number
}
