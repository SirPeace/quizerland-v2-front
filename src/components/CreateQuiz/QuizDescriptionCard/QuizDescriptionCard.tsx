'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardActions, Box } from '@mui/material'
import TextField from '@mui/material/TextField'

import { debounce } from 'lodash-es'
import { type FormEvent, useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { updateQuizDescription } from '@/redux/quizForm/quizFormSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import CreateQuizContext from '../context'
import { type TQuizDescriptionForm, quizDescriptionFormSchema } from '../schema'

export default function QuizDescriptionForm(): JSX.Element {
  const { setActiveTab } = useContext(CreateQuizContext)

  const { quizDescription } = useAppSelector(
    ({ quizFormState }) => quizFormState,
  )
  const dispatch = useAppDispatch()

  const { control, reset } = useForm<TQuizDescriptionForm>({
    resolver: zodResolver(quizDescriptionFormSchema),
  })

  useEffect(() => {
    reset({
      title: quizDescription.title,
      description: quizDescription.description,
    })
  }, [quizDescription, reset])

  function goToQuestion(): void {
    setActiveTab(prev => prev + 1)
  }

  const onInput = (e: any, field: keyof TQuizDescriptionForm): any => {
    dispatch(
      updateQuizDescription({
        [field]: 'value',
      }),
    )
  }

  return (
    <Card raised className="py-5 px-5  rounded-xl">
      <Box component="form">
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              onInput={e => onInput(e, 'title')}
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
              onInput={e => onInput(e, 'description')}
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

        <CardActions className="p-0 mt-5 justify-center">
          <Button
            onClick={goToQuestion}
            type="button"
            size="small"
            variant="contained"
            className="m-0"
          >
            Перейти к добавлению вопросов
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}
