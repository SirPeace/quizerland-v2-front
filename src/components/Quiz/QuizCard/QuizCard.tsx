import { Divider, Paper } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'

import type { IQuizzesItem } from '@/api/modules/types'

import type { FC } from 'react'

interface IQuizProps {
  quiz: IQuizzesItem
  orderNumber: number
  itemStyle?: React.CSSProperties
}
const Quiz: FC<IQuizProps> = ({ quiz, itemStyle, orderNumber }) => {
  const router = useRouter()

  return (
    <Paper
      elevation={8}
      className="bg-white rounded-xl"
      style={itemStyle ?? {}}
    >
      <div className="flex justify-between p-3">
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          margin={0}
          className="text-left indent-4 line-clamp-1"
        >
          {quiz.title}
        </Typography>

        <p className="text-sm antialiased font-semibold m-0 text-gray-400 whitespace-nowrap">
          тест № {`${orderNumber}`}
        </p>
      </div>

      <Divider className="mx-2" />
      <p className="px-4 text-justify line-clamp-2 indent-4 text-sky-600 ">
        {quiz.description}
      </p>

      <div className="flex justify-between px-4">
        <p className="text-sm font-semibold text-gray-400 ">
          тест из {`${quiz.questionsCount}`} вопросов
        </p>
        <Button
          className="mb-4 opacity-80"
          color="primary"
          variant="contained"
          size="small"
          onClick={() => {
            router.push(`/quizzes/${quiz.id}`)
          }}
        >
          перейти к тесту
        </Button>
      </div>
    </Paper>
  )
}

export default Quiz
