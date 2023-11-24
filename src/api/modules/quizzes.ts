import type { TQuizForm } from '@/components/CreateQuiz/types'

import type { IQuizTitle } from '@/redux/quizTitles/types'

import httpClient from '../httpClient'

import type { AxiosResponse } from 'axios'

export const createQuiz = async (
  data: TQuizForm,
): Promise<AxiosResponse<TQuizForm>> =>
  await httpClient.post<TQuizForm>('api/quizzes/create', data)

export const getQuizzes = async (): Promise<IQuizTitle[]> => {
  const { data } = await httpClient.get<IQuizTitle[]>('api/quizzes')
  return data
}
