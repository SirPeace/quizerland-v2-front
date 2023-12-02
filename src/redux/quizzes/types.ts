export interface IQuizzesState {
  quizzesTotalCount: null | number
  quizzes: IQuizzesItem[]
}

export interface IQuizzesItem {
  title: string
  description: string
  userId: string
  id: string
}
