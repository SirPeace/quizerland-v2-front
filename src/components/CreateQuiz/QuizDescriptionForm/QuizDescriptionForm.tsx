'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardActions, Box } from '@mui/material'
import TextField from '@mui/material/TextField'

import { useForm } from 'react-hook-form'

import { descriptionSchema, type TDescriptionSchema } from '../types'

import type { SubmitHandler } from 'react-hook-form'

export default function QuizDescriptionForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TDescriptionSchema>({ resolver: zodResolver(descriptionSchema) })

  const onSubmit: SubmitHandler<TDescriptionSchema> = async (
    data,
  ): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(data)
    // reset()
  }

  return (
    <Card raised className="py-5 px-5 rounded-xl">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('title')}
          type="text"
          label="Добавьте название теста"
          multiline
          fullWidth
          focused
          placeholder="Пример: Тест по теме 'Космос'"
          error={errors.title !== undefined}
        />
        <p className="mt-0.5 pl-3 text-xs text-red-600 h-4">
          {errors.title !== undefined ? errors.title.message : ''}
        </p>

        <TextField
          {...register('description')}
          type="text"
          label="Добавьте описание к тесту"
          multiline
          fullWidth
          focused
          rows={5}
          error={errors.description !== undefined}
          placeholder="Пример: Космическое пространство, космос (др.-греч. κόσμος — «упорядоченность», «порядок») — относительно пустые участки Вселенной, которые лежат вне границ атмосфер небесных тел. Космос не является абсолютно пустым пространством: в нём есть, хотя и с очень низкой плотностью, межзвёздное вещество (преимущественно ионы и атомы водорода), космические лучи и электромагнитное излучение, а также гипотетическая тёмная материя."
        />
        <p className="mt-0.5 pl-3 text-xs text-red-600 h-4">
          {errors.description !== undefined ? errors.description.message : ''}
        </p>

        <CardActions className="p-0 mt-5 justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
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
