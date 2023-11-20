import type {
  TSingInSchema,
  TUserRegistrationData,
} from '@/components/Auth/types'

import type { IUser } from '@/redux/auth/types'

import httpClient from '../httpClient'

import type { AxiosResponse } from 'axios'

export const registerUser = async (
  data: TUserRegistrationData,
): Promise<AxiosResponse<IUser>> =>
  await httpClient.post<IUser>('/api/auth/register', data)

export const login = async (
  data: TSingInSchema,
): Promise<AxiosResponse<IUser>> =>
  await httpClient.post<IUser>('/api/auth', data)

export const logout = async (): Promise<void> => {
  await httpClient.delete('/api/auth')
}

export const user = async (): Promise<IUser> => {
  const { data } = await httpClient.get<IUser>('/api/auth')
  return data
}
