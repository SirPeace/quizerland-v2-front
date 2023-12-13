import type { TQuizForm } from '@/components/CreateQuiz/types'

import httpClient from '../httpClient'

import type {
  ICreatedQuizResponse,
  IQuizResponse,
  IQuizzesResponse,
} from './types'

import type { AxiosResponse } from 'axios'

export const createQuiz = async (
  quizData: TQuizForm,
): Promise<ICreatedQuizResponse> => {
  const { data } = await httpClient.post<ICreatedQuizResponse>(
    '/api/quizzes/create',
    quizData,
  )
  return data
}
export const getQuizzes = async (
  pageNumber: number,
): Promise<IQuizzesResponse> => {
  const { data } = await httpClient.get<IQuizzesResponse>(
    `/api/quizzes/?page=${pageNumber}`,
  )
  return data
}

export const getQuiz = async (quizId: string): Promise<IQuizResponse> => {
  const { data } = await httpClient.get<IQuizResponse>(`/api/quizzes/${quizId}`)
  return data
}

export const updateQuizProgress = async (
  quizId: string,
  isRightAttempt: boolean,
): Promise<AxiosResponse> => {
  const response = await httpClient.put<AxiosResponse>(
    `/api/quizzes/${quizId}/progress`,
    {
      isRightAttempt,
    },
  )
  return response
}

export const deleteQuizProgress = async (
  quizId: string,
): Promise<AxiosResponse> =>
  await httpClient.delete(`/api/quizzes/${quizId}/progress`)

export const getNextIncompleteQuiz = async (
  quizId: string,
): Promise<{ _id: string }> => {
  const { data } = await httpClient.get<{ _id: string }>(
    `/api/quizzes/next-incomplete`,
    {
      params: { excludeIds: [quizId] },
    },
  )
  return data
}
