'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Box } from '@mui/material'
import TextField from '@mui/material/TextField'

import { debounce } from 'lodash-es'
import { type ChangeEvent, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { getQuizDescriptionFormAndStoreErrorsDiff } from '@/redux/quizForm/helpers'
import {
  setQuizDescriptionFieldErrors,
  updateQuizDescription,
} from '@/redux/quizForm/quizFormSlice'
import type { TQuizDescriptionFormErrors } from '@/redux/quizForm/types'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import { type TQuizDescriptionForm, quizDescriptionFormSchema } from '../schema'

export default function QuizDescriptionForm(): JSX.Element {
  const { quizDescription } = useAppSelector(
    ({ quizFormState }) => quizFormState,
  )
  const dispatch = useAppDispatch()

  const { control, reset, formState, setError, clearErrors } =
    useForm<TQuizDescriptionForm>({
      mode: 'onChange',
      resolver: zodResolver(quizDescriptionFormSchema),
    })

  useEffect(() => {
    reset({
      title: quizDescription.title,
      description: quizDescription.description,
    })
  }, [])

  useEffect(() => {
    const errorsDiff = getQuizDescriptionFormAndStoreErrorsDiff(
      formState.errors,
      quizDescription.errors,
    )

    if (Object.keys(errorsDiff).length > 0) {
      dispatch(setQuizDescriptionFieldErrors(formState.errors))
    }
  }, [formState])

  useEffect(() => {
    if (quizDescription.errors !== undefined) {
      let errorKey: keyof TQuizDescriptionFormErrors
      for (errorKey in quizDescription.errors) {
        setError(errorKey, { message: quizDescription.errors[errorKey] })
      }
    } else {
      clearErrors()
    }
  }, [quizDescription.errors])

  const onInput = debounce(
    (
      event: ChangeEvent<HTMLInputElement>,
      field: keyof TQuizDescriptionForm,
    ): void => {
      dispatch(
        updateQuizDescription({
          [field]: event.target.value,
        }),
      )
    },
    500,
  )

  return (
    <Card raised className="py-5 px-5 rounded-xl mx-3">
      <Box component="form">
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                onInput(e, 'title')
              }
              label="Название теста"
              multiline
              fullWidth
              className="mb-6"
              placeholder="Пример: Тест по теме 'Космос'"
              error={undefined !== error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                onInput(e, 'description')
              }
              label="Описание к тесту"
              multiline
              fullWidth
              rows={5}
              placeholder="Пример: Космическое пространство, космос (др.-греч. κόσμος — «упорядоченность», «порядок»)..."
              error={undefined !== error}
              helperText={error?.message}
            />
          )}
        />
      </Box>
    </Card>
  )
}
