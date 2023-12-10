import type { TQuizForm } from '@/components/CreateQuiz/types'

import httpClient from '../httpClient'

import type {
  IProgressResponse,
  IQuizResponse,
  IQuizzesResponse,
} from './types'

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

export const updateQuizProgress = async (
  quizId: string,
  isRightAttempt: boolean,
): Promise<IProgressResponse> => {
  const { data } = await httpClient.put<IProgressResponse>(
    `api/quizzes/${quizId}/progress`,
    {
      isRightAttempt,
    },
  )
  return data
}

export const deleteQuizProgress = async (
  quizId: string,
): Promise<AxiosResponse> =>
  await httpClient.delete(`api/quizzes/${quizId}/progress`)
