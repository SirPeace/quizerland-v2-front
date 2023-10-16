import { Box, Button, Card } from '@mui/material'

import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

const QuizQuestionForm = (): JSX.Element => {
  const [selected, setSelected] = useState(false)

  return (
    <Card raised className="py-5 px-5 rounded-xl">
      <Box component="form" /* onSubmit={handleSubmit(onSubmit)} */>
        <TextField
          label="Добавьте текст вопроса"
          type="text"
          placeholder="Пример: Первый астронавт вышедший в открытый космос?"
          fullWidth
        />
        <div className="flex w-full my-5">
          <Radio
            className="mt-3 mr-2"
            checked={selected}
            onClick={() => {
              setSelected(!selected)
            }}
          />

          <TextField
            type="text"
            variant="standard"
            label="Добавьте 1-й вариант ответа"
            multiline
            fullWidth
            placeholder="Пример: Юрий Гагарин"
            className=""
          />
        </div>

        <div className="flex w-full my-5">
          <Radio
            className="mt-3 mr-2"
            checked={selected}
            onClick={() => {
              setSelected(!selected)
            }}
          />

          <TextField
            type="text"
            variant="standard"
            label="Добавьте 2-й вариант ответа"
            multiline
            fullWidth
            placeholder="Пример: Юрий Гагарин"
            className=""
          />
        </div>

        <div className="flex w-full my-5">
          <Radio
            className="mt-3 mr-2"
            checked={selected}
            onClick={() => {
              setSelected(!selected)
            }}
          />

          <TextField
            type="text"
            variant="standard"
            label="Добавьте 3-й вариант ответа"
            multiline
            fullWidth
            placeholder="Пример: Юрий Гагарин"
            className=""
          />
        </div>

        <div className="flex w-full my-5">
          <Radio
            className="mt-3 mr-2"
            checked={selected}
            onClick={() => {
              setSelected(!selected)
            }}
          />

          <TextField
            type="text"
            variant="standard"
            label="Добавьте 4-й вариант ответа"
            multiline
            fullWidth
            placeholder="Пример: Юрий Гагарин"
            className=""
          />
        </div>

        <div className="flex w-full my-5">
          <Radio
            className="mt-3 mr-2"
            checked={selected}
            onClick={() => {
              setSelected(!selected)
            }}
          />

          <TextField
            type="text"
            variant="standard"
            label="Добавьте 5-й вариант ответа"
            multiline
            fullWidth
            placeholder="Пример: Юрий Гагарин"
            className=""
          />
        </div>

        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </Box>
    </Card>
  )
}

export default QuizQuestionForm
