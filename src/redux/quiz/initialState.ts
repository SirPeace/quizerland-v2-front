import type { IQuiz } from './types'

const quizState: IQuiz = {
  currentQuestionIndex: 0,
  rightAttempts: 0,
  isFinished: false,
  isPreview: true,
  progressId: '',
  createdAt: '',

  id: '',
  userId: '',
  title: '',
  description: '',
  questions: [],
}

export default quizState
