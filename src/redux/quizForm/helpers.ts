import type {
  TQuestionForm,
  TQuizDescriptionForm,
} from '@/components/CreateQuiz/schema'

import type { TQuestionFormErrors, TQuizDescriptionFormErrors } from './types'

import type { FieldErrors } from 'react-hook-form'

export function quizDescriptionFormErrorsToStoreErrors(
  formStateErrors: FieldErrors<TQuizDescriptionForm>,
): TQuizDescriptionFormErrors {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const storeErrors = {} as TQuizDescriptionFormErrors

  let k: keyof FieldErrors<TQuizDescriptionForm>
  for (k in formStateErrors) {
    if (k === 'root') continue

    const payloadValue = formStateErrors[k]?.message
    if (payloadValue !== undefined) {
      storeErrors[k] = payloadValue
    }
  }

  return storeErrors
}

export function questionFormErrorsToStoreErrors(
  formStateErrors: FieldErrors<TQuestionForm>,
): TQuestionFormErrors {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const storeErrors = {} as TQuestionFormErrors

  let k: keyof FieldErrors<TQuestionForm>
  for (k in formStateErrors) {
    if (k === 'root') continue

    if (k === 'answers') {
      formStateErrors.answers?.forEach?.((answer, idx) => {
        const errorMessage = answer?.text?.message
        if (errorMessage !== undefined)
          storeErrors[`answers.${idx}.text`] = errorMessage
      })
      continue
    }

    const payloadValue = formStateErrors[k]?.message
    if (payloadValue !== undefined) {
      storeErrors[k] = payloadValue
    }
  }

  return storeErrors
}

export function getQuizDescriptionFormAndStoreErrorsDiff(
  formStateErrors: FieldErrors<TQuestionForm>,
  storeErrors: TQuestionFormErrors,
): TQuestionFormErrors {
  const sanitizedFormStateErrors =
    questionFormErrorsToStoreErrors(formStateErrors)

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const diff = {} as TQuestionFormErrors

  let k: keyof TQuestionFormErrors
  for (k in sanitizedFormStateErrors) {
    if (sanitizedFormStateErrors[k] !== storeErrors[k]) {
      diff[k] = sanitizedFormStateErrors[k]
    }
  }

  return diff
}

export function getQuestionFormAndStoreErrorsDiff(
  formStateErrors: FieldErrors<TQuizDescriptionForm>,
  storeErrors: TQuizDescriptionFormErrors,
): TQuizDescriptionFormErrors {
  const sanitizedFormStateErrors =
    quizDescriptionFormErrorsToStoreErrors(formStateErrors)

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const diff = {} as TQuizDescriptionFormErrors

  let k: keyof TQuizDescriptionFormErrors
  for (k in sanitizedFormStateErrors) {
    if (sanitizedFormStateErrors[k] !== storeErrors[k]) {
      diff[k] = sanitizedFormStateErrors[k]
    }
  }

  return diff
}
