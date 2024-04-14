import { Divider, Paper } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'

import type { IQuizzesItem } from '@/api/modules/types'

interface IQuizListItemProps {
  quiz: IQuizzesItem
  orderNumber: number
  itemStyle?: React.CSSProperties
}
const QuizListItem: FC<IQuizListItemProps> = ({ quiz, itemStyle, orderNumber }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const router = useRouter()

  return (
    <Paper
      elevation={8}
      className="bg-white rounded-xl flex flex-col justify-between"
      style={itemStyle ?? {}}
    >
      <section>
        <div
          className={'flex justify-between p-3 ' + (isMobile ? 'flex-col-reverse text-center' : '')}
        >
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
        <p
          className={
            'px-4 text-justify indent-4 text-sky-600 ' +
            (isMobile ? 'line-clamp-2' : 'line-clamp-4')
          }
        >
          {quiz.description}
        </p>
      </section>

      <section className={'flex justify-between px-4 ' + (isMobile ? 'flex-col' : '')}>
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
      </section>
    </Paper>
  )
}

export default QuizListItem
