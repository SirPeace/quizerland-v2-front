export interface IQuizTitlesState {
  activeQuizId: number
  quizzesTotalCount: null | number
  quizzes: IQuizTitle[]
}

export interface IQuizTitle {
  title: string
  description: string
  userId: string
}
