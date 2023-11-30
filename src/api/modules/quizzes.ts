import type { TQuizForm } from '@/components/CreateQuiz/types'

import type { IQuizzesItem } from '@/redux/quizzes/types'

import httpClient from '../httpClient'

import type { IQuizResponse } from './types'

import type { AxiosResponse } from 'axios'

interface IQuizzesResponse {
  quizzes: IQuizzesItem[]
  quizzesTotalCount: number
}

export const createQuiz = async (
  data: TQuizForm,
): Promise<AxiosResponse<TQuizForm>> =>
  await httpClient.post<TQuizForm>('api/quizzes/create', data)

export const getQuizzes = async (
  pageNumber: number,
): Promise<IQuizzesResponse> => {
  const { data } = await httpClient.get<IQuizzesResponse>(
    `api/quizzes/?page=${pageNumber}`,
  )
  return data
}

export const getQuiz = async (quizId: string): Promise<IQuizResponse> => {
  const { data } = await httpClient.get<IQuizResponse>(`api/quizzes/${quizId}`)
  return data
}
