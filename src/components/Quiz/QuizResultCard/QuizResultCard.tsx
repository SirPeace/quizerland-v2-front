'use client'

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'

import { Divider, Paper } from '@mui/material'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import {
  deleteQuizProgress,
  getNextIncompleteQuiz,
} from '@/api/modules/quizzes'
import {
  resetRightAttempts,
  resetCurrentQuestion,
} from '@/redux/quiz/quizSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

const QuizResultCard = (): JSX.Element => {
  const { correctAnswersCount, wrongAnswersCount, quiz } = useAppSelector(
    ({ quizState }) => {
      const quiz = quizState
      const questionsCount = quiz.questions.length ?? 0
      const correctAnswersCount = quiz.rightAttempts ?? 0
      const wrongAnswersCount = questionsCount - correctAnswersCount

      return { wrongAnswersCount, correctAnswersCount, quiz }
    },
  )

  const dispatch = useAppDispatch()

  const router = useRouter()

  const goToNextQuiz = async (): Promise<void> => {
    try {
      const nextQuiz = await getNextIncompleteQuiz(quiz.id)

      dispatch(resetRightAttempts())
      router.push(`/quizzes/${nextQuiz._id}`)
    } catch (err: any) {
      if (err instanceof AxiosError) {
        const error = err.response?.data?.message
        console.error(error)
      } else {
        console.error('Произошла ошибка, обратитесь в тех. поддержку')
      }
    }
  }

  const restartQuiz = async (): Promise<void> => {
    try {
      await deleteQuizProgress(quiz.id)

      dispatch(resetCurrentQuestion())
    } catch (err: any) {
      if (err instanceof AxiosError) {
        const error = err.response?.data?.message
        console.error(error)
      } else {
        console.error('Произошла ошибка, обратитесь в тех. поддержку')
      }
    }
  }

  return (
    <Paper elevation={8} className="rounded-xl">
      <CardContent sx={{ pb: 0 }}>
        <Typography gutterBottom variant="h6" component="div">
          Результат теста
        </Typography>
        <Divider />

        <RadioGroup className="mx-4 my-4">
          <FormControlLabel
            control={
              <HighlightOffOutlinedIcon
                className="text-red-400"
                sx={{ margin: '9px' }}
              />
            }
            className="text-red-400"
            label={`Неверные ответы : ${wrongAnswersCount}`}
          />
          <div className="h-2" />
          <FormControlLabel
            control={
              <VerifiedOutlinedIcon
                className="text-green-700"
                sx={{ margin: '9px' }}
              />
            }
            className="text-green-600"
            label={`Правильные ответы : ${correctAnswersCount}`}
          />
        </RadioGroup>
      </CardContent>
      <CardActions className="mx-3">
        <Button size="small" className="mr-3" onClick={restartQuiz}>
          Повторить
        </Button>
        <Button size="small" onClick={goToNextQuiz}>
          К следующему тесту
        </Button>
      </CardActions>
    </Paper>
  )
}
export default QuizResultCard
