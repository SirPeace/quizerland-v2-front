import type {
  TSingInSchema,
  TUserRegistrationData,
} from '@/components/Auth/types'

import type { IUser } from '@/redux/auth/types'

import $api from '..'

import type { AxiosResponse } from 'axios'

export const registerUser = async (
  data: TUserRegistrationData,
): Promise<AxiosResponse<IUser>> =>
  await $api.post<IUser>('/api/auth/register', data)

export const login = async (
  data: TSingInSchema,
): Promise<AxiosResponse<IUser>> => await $api.post<IUser>('/api/auth', data)

export const logout = async (): Promise<void> => {
  await $api.delete('/api/auth')
}

export const user = async (): Promise<IUser> => {
  const { data } = await $api.get<IUser>('/api/auth')
  return data
}
