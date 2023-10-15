import type { IAuthState, IUser } from './types'

export const defaultUser: IUser = {
  email: 'default_user@mail.com',
  nickname: '#default_user',
}

const authState: IAuthState = {
  user: undefined,
}

export default authState
