export interface IUser {
  email: string
  nickname: string
}

export interface IAuthState {
  user?: IUser
}
