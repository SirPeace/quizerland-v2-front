import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import quizFormState, { defaultQuestion } from './initialState'

import type {
  IQuestionForm,
  IQuestionFormAnswer,
  IQuizDescription,
} from './types'

interface IUpdateQuestionPayload {
  index: number
  question: Partial<IQuestionForm>
}
interface IUpdateAnswerPayload {
  questionIndex: number
  answerIndex: number
  answer: Partial<IQuestionFormAnswer>
}
interface IAppendAnswerPayload {
  questionIndex: number
}
interface IRemoveAnswerPayload {
  questionIndex: number
  answerIndex: number
}

export const quizFormSlice = createSlice({
  name: 'quizForm',
  initialState: quizFormState,
  reducers: {
    updateQuizDescription(
      state,
      { payload }: PayloadAction<Partial<IQuizDescription>>,
    ) {
      state.quizDescription = {
        ...state.quizDescription,
        ...payload,
      }
    },

    addQuestion(state) {
      state.questions.push(defaultQuestion)
    },
    updateQuestion(state, { payload }: PayloadAction<IUpdateQuestionPayload>) {
      state.questions[payload.index] = {
        ...state.questions[payload.index],
        ...payload.question,
      }
    },

    updateAnswer(state, { payload }: PayloadAction<IUpdateAnswerPayload>) {
      const { questionIndex, answerIndex, answer: newAnswer } = payload

      const answer = state.questions[questionIndex].answers[answerIndex]
      if (undefined === answer) {
        return
      }

      state.questions[questionIndex].answers[answerIndex] = {
        ...answer,
        ...newAnswer,
      }
    },
    appendAnswer(state, { payload }: PayloadAction<IAppendAnswerPayload>) {
      const { questionIndex } = payload

      state.questions[questionIndex].answers.push({ text: '' })
    },
    removeAnswer(state, { payload }: PayloadAction<IRemoveAnswerPayload>) {
      const { questionIndex, answerIndex } = payload

      state.questions[questionIndex].answers.splice(answerIndex, 1)
    },
  },
})

export const {
  addQuestion,
  updateQuestion,
  updateQuizDescription,
  updateAnswer,
  appendAnswer,
  removeAnswer,
} = quizFormSlice.actions
export default quizFormSlice.reducer
