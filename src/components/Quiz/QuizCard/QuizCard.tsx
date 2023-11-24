import { Divider, Paper } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'

import type { IQuizTitle } from '@/redux/quizTitles/types'

interface IQuizProp {
  quiz: IQuizTitle
}
const Quiz = ({ quiz }: IQuizProp): JSX.Element => {
  const router = useRouter()

  return (
    <Paper elevation={8} className="bg-white my-4 mx-6 rounded-xl">
      <div className="flex justify-between p-3">
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          margin={0}
          className="text-left indent-4"
        >
          {quiz.title}
        </Typography>

        <p className="text-sm antialiased font-semibold m-0 text-gray-400">
          тест № {`TASK 1`}
        </p>
      </div>

      <Divider className="mx-2" />
      <p className="px-4 text-justify line-clamp-3 indent-4 text-sky-600 ">
        {quiz.description}
      </p>

      <div className="flex justify-between px-4">
        <p className="text-sm font-semibold text-gray-400 ">
          тест из {`TASK 1`} вопросов
        </p>
        <Button
          className="mb-4 opacity-80"
          color="primary"
          variant="contained"
          size="small"
          onClick={() => {
            // router.push(`/quizzes/${1}`)
          }}
        >
          перейти к тесту
        </Button>
      </div>
    </Paper>
  )
}

export default Quiz
