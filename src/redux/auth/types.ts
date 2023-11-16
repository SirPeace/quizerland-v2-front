export interface IUser {
  id: string
  email: string
  nickname: string
}

export interface IAuthState {
  user?: IUser
}
