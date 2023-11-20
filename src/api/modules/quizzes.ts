import type { TQuizForm } from '@/components/CreateQuiz/types'

import httpClient from '../httpClient'

import type { AxiosResponse } from 'axios'

export const createQuiz = async (
  data: TQuizForm,
): Promise<AxiosResponse<TQuizForm>> =>
  await httpClient.post<TQuizForm>('api/quizzes/create', data)
