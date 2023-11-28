import type { TQuizForm } from '@/components/CreateQuiz/types'

import type { IQuizTitle } from '@/redux/quizTitles/types'

import httpClient from '../httpClient'

import type { AxiosResponse } from 'axios'

interface IGetQuiz {
  quizzes: IQuizTitle[]
  quizzesTotalCount: number
}

export const createQuiz = async (
  data: TQuizForm,
): Promise<AxiosResponse<TQuizForm>> =>
  await httpClient.post<TQuizForm>('api/quizzes/create', data)

export const getQuizzes = async (pageNumber: number): Promise<IGetQuiz> => {
  const { data } = await httpClient.get<IGetQuiz>(
    `api/quizzes/?page=${pageNumber}`,
  )
  return data
}
