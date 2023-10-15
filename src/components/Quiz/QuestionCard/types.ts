import type { IQuestion } from '@/redux/quiz/types'

export interface IQuestionCardProps {
  question: IQuestion
  questionsLength: number
}

export interface IFormControlStyles {
  icon: JSX.Element
  text: string
}

export interface IHelperText {
  text: string
  style: string
}
