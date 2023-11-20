export interface IUser {
  id: string
  email: string
  nickname: string
}

export interface IAuthState {
  /**
   * Залогинен ли пользователь.
   *
   * Равен undefined если ещё не было запроса за пользователем.
   */
  isLoggedIn?: boolean
  user?: IUser
}
