import type { TQuizForm } from '@/components/CreateQuiz/types'

import httpClient from '../httpClient'

import type { IQuizResponse, IQuizzesResponse } from './types'

import type { AxiosResponse } from 'axios'

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
