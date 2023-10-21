'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardActions, Box } from '@mui/material'
import TextField from '@mui/material/TextField'

import { debounce } from 'lodash-es'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { setDescription } from '@/redux/createQuiz/createQuizSlice'
import type { ICreateQuizState } from '@/redux/createQuiz/types'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import CreateQuizContext from '../context'
import { descriptionSchema, type TDescriptionSchema } from '../types'

export default function QuizDescriptionForm(): JSX.Element {
  const { title, description } = useAppSelector(
    ({ createQuizState }) => createQuizState,
  )

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<TDescriptionSchema>({
    mode: 'onChange',
    defaultValues: {
      title,
      description,
    },
    resolver: zodResolver(descriptionSchema),
  })

  const dispatch = useAppDispatch()

  const { setActiveTab } = useContext(CreateQuizContext)

  const goToQuestion = (): void => {
    setActiveTab(previousState => previousState + 1)
  }

  useEffect(() => {
    const subscription = watch(
      debounce(value => {
        const isDescription = value.description !== undefined
        const isTitle = value.title !== undefined

        if (isDescription && isTitle) {
          const newDescription: Omit<ICreateQuizState, 'questions'> = {
            title: value.title,
            description: value.description,
          }
          dispatch(setDescription(newDescription))
        }
      }, 500),
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, dispatch])

  return (
    <Card raised className="py-5 px-5  rounded-xl">
      <Box component="form">
        <TextField
          {...register('title')}
          type="text"
          label="Добавьте название теста"
          multiline
          fullWidth
          focused
          className="mb-6"
          placeholder="Пример: Тест по теме 'Космос'"
          error={Object.hasOwn(errors, 'title')}
          helperText={errors.title?.message}
        />

        <TextField
          {...register('description')}
          type="text"
          label="Добавьте описание к тесту"
          multiline
          fullWidth
          focused
          rows={5}
          placeholder="Пример: Космическое пространство, космос (др.-греч. κόσμος — «упорядоченность», «порядок») — относительно пустые участки Вселенной, которые лежат вне границ атмосфер небесных тел. Космос не является абсолютно пустым пространством: в нём есть, хотя и с очень низкой плотностью, межзвёздное вещество (преимущественно ионы и атомы водорода), космические лучи и электромагнитное излучение, а также гипотетическая тёмная материя."
          error={Object.hasOwn(errors, 'description')}
          helperText={errors.description?.message}
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
