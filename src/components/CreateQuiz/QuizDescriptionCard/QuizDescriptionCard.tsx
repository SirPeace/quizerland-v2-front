'use client'

import { Button, Card, CardActions, Box } from '@mui/material'
import TextField from '@mui/material/TextField'

import { useContext } from 'react'

import CreateQuizContext from '../context'

export default function QuizDescriptionForm(): JSX.Element {
  const { form, setActiveTab } = useContext(CreateQuizContext)
  if (undefined === form) return <></>

  const {
    register,
    formState: { errors },
  } = form

  const goToQuestion = (): void => {
    setActiveTab(prev => prev + 1)
  }

  return (
    <Card raised className="py-5 px-5  rounded-xl">
      <Box component="form">
        <TextField
          {...register('title')}
          type="text"
          label="Добавьте название теста"
          multiline
          fullWidth
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
          rows={5}
          // placeholder="Пример: Космическое пространство, космос (др.-греч. κόσμος — «упорядоченность», «порядок») — относительно пустые участки Вселенной, которые лежат вне границ атмосфер небесных тел. Космос не является абсолютно пустым пространством: в нём есть, хотя и с очень низкой плотностью, межзвёздное вещество (преимущественно ионы и атомы водорода), космические лучи и электромагнитное излучение, а также гипотетическая тёмная материя."
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
