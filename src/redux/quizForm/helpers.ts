import type {
  TQuestionForm,
  TQuizDescriptionForm,
} from '@/components/CreateQuiz/schema'

import type { TQuestionFormErrors, TQuizDescriptionFormErrors } from './types'

import type { FieldErrors } from 'react-hook-form'
import type { ZodIssue } from 'zod'

interface IQuizFormErrors {
  quizDescription: TQuizDescriptionFormErrors
  questions: TQuestionFormErrors[]
}
export function parseServerErrors(serverErrors: ZodIssue[]): IQuizFormErrors {
  const errors: IQuizFormErrors = {
    quizDescription: {},
    questions: [],
  }

  serverErrors.forEach(error => {
    if (error.path[0] === 'questions') {
      const questionIndex = Number(error.path[1])

      const field = error.path[2]
      if (field === 'title' || field === 'rightAnswerId') {
        errors.questions[questionIndex] ??= {}
        errors.questions[questionIndex][field] = error.message
      }
      if (field === 'answers') {
        const answerIndex = Number(error.path[3])

        errors.questions[questionIndex] ??= {}
        errors.questions[questionIndex][`answers.${answerIndex}.text`] =
          error.message
      }

      return
    }

    const field = error.path[0]
    if (field === 'title' || field === 'description') {
      errors.quizDescription[field] = error.message
    }
  })

  return errors
}

// ==============================
//     Quiz description form
// ==============================
export function parseQuizDescriptionFormFieldErrors(
  formFieldErrors: FieldErrors<TQuizDescriptionForm>,
): TQuizDescriptionFormErrors {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const storeErrors = {} as TQuizDescriptionFormErrors

  let k: keyof FieldErrors<TQuizDescriptionForm>
  for (k in formFieldErrors) {
    if (k === 'root') continue

    const payloadValue = formFieldErrors[k]?.message
    if (payloadValue !== undefined) {
      storeErrors[k] = payloadValue
    }
  }

  return storeErrors
}

export function getQuizDescriptionFormAndStoreErrorsDiff(
  formFieldErrors: FieldErrors<TQuizDescriptionForm>,
  storeErrors: TQuizDescriptionFormErrors,
): TQuizDescriptionFormErrors {
  const parsedFormFieldErrors =
    parseQuizDescriptionFormFieldErrors(formFieldErrors)

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const diff = {} as TQuizDescriptionFormErrors

  let k: keyof TQuizDescriptionFormErrors
  for (k in parsedFormFieldErrors) {
    if (parsedFormFieldErrors[k] !== storeErrors[k]) {
      diff[k] = parsedFormFieldErrors[k]
    }
  }
  for (k in storeErrors) {
    if (storeErrors[k] !== parsedFormFieldErrors[k]) {
      diff[k] = storeErrors[k]
    }
  }

  return diff
}

// ==============================
//         Question form
// ==============================
export function parseQuestionFormFieldErrors(
  formFieldErrors: FieldErrors<TQuestionForm>,
): TQuestionFormErrors {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const storeErrors = {} as TQuestionFormErrors

  let k: keyof FieldErrors<TQuestionForm>
  for (k in formFieldErrors) {
    if (k === 'root') continue

    if (k === 'answers') {
      formFieldErrors.answers?.forEach?.((answer, idx) => {
        const errorMessage = answer?.text?.message
        if (errorMessage !== undefined)
          storeErrors[`answers.${idx}.text`] = errorMessage
      })
      continue
    }

    const payloadValue = formFieldErrors[k]?.message
    if (payloadValue !== undefined) {
      storeErrors[k] = payloadValue
    }
  }

  return storeErrors
}

export function getQuestionFormAndStoreErrorsDiff(
  formFieldErrors: FieldErrors<TQuestionForm>,
  storeErrors: TQuestionFormErrors,
): TQuestionFormErrors {
  const parsedFormFieldErrors = parseQuestionFormFieldErrors(formFieldErrors)

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const diff = {} as TQuestionFormErrors

  let k: keyof TQuestionFormErrors
  for (k in parsedFormFieldErrors) {
    if (parsedFormFieldErrors[k] !== storeErrors[k]) {
      diff[k] = parsedFormFieldErrors[k]
    }
  }
  for (k in storeErrors) {
    if (storeErrors[k] !== parsedFormFieldErrors[k]) {
      diff[k] = storeErrors[k]
    }
  }

  return diff
}
