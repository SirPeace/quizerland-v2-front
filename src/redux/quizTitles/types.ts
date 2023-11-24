export interface IQuizTitlesState {
  activeQuizId: number
  quizzes: IQuizTitle[]
}

export interface IQuizTitle {
  title: string
  description: string
  userId: string
}
