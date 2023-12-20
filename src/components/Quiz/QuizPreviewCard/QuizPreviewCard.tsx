'use client'

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PersonIcon from '@mui/icons-material/Person'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import {
  deleteQuizProgress,
  getNextIncompleteQuiz,
} from '@/api/modules/quizzes'
import { resetCurrentQuestion, setIsPreview } from '@/redux/quiz/quizSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'
import { getFormattedDate } from '@/utils/getFormattedDate'

import type { Metadata } from 'next'
import type { FC } from 'react'
interface Props {
  params: {
    quiz: string
  }
}

export async function generateMetadata({
  params: { quiz },
}: Props): Promise<Metadata> {
  return {
    title: `${quiz} | Quizerland`,
  }
}

const QuizPreviewCard: FC = () => {
  const { user } = useAppSelector(({ authState }) => authState)

  const { correctAnswersCount, wrongAnswersCount, quiz, questionsCount } =
    useAppSelector(({ quizState }) => {
      const { questions, ...quiz } = quizState
      const questionsCount = questions.length ?? 0
      const correctAnswersCount = quizState.rightAttempts ?? 0
      const wrongAnswersCount = questionsCount - correctAnswersCount

      return {
        wrongAnswersCount,
        correctAnswersCount,
        quiz,
        questionsCount,
      }
    })

  const dispatch = useAppDispatch()

  const router = useRouter()

  const quizCreationDate = getFormattedDate(quiz.createdAt)

  const goToNextQuiz = async (): Promise<void> => {
    try {
      const nextQuiz = await getNextIncompleteQuiz(quiz.id)

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
    dispatch(resetCurrentQuestion())
    dispatch(setIsPreview(false))

    try {
      await deleteQuizProgress(quiz.id)
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
    <Card raised className="py-2 px-2 text-left rounded-xl">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <PersonIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`Автор теста: ${user?.nickname} ( email: ${user?.email} ) .`}
        subheader={`Дата создания теста: ${quizCreationDate} .`}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-left indent-2"
        >
          {quiz.title}
        </Typography>

        <Divider />

        <Typography
          variant="body1"
          color="text.secondary"
          className="indent-2 text-justify my-[1rem]"
        >
          {quiz.description}
        </Typography>

        <Divider />

        {!quiz.isFinished ? (
          <div className="flex justify-between mt-[1rem]">
            <Typography
              variant="body1"
              color="text.secondary"
              className="indent-2 text-justify"
            >
              {`Тест из ${questionsCount} вопросов`}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              className="indent-2 text-justify"
            >
              {quiz.currentQuestionIndex === 0
                ? 'Прогресс: Тест не пройден'
                : `Прогресс: ${quiz.currentQuestionIndex + 1}-й вопрос`}
            </Typography>
          </div>
        ) : (
          <>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="mt-[0.5rem] indent-2"
            >
              Результат теста
            </Typography>

            <RadioGroup className="mx-4 mt-4">
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
          </>
        )}
      </CardContent>

      <CardActions>
        {!quiz.isFinished ? (
          <div className="flex ml-auto">
            <Button
              size="medium"
              className="mr-[0.5rem]"
              onClick={() => {
                dispatch(setIsPreview(false))
              }}
            >
              Пройти тест
            </Button>
          </div>
        ) : (
          <>
            <Button size="medium" className="mr-3" onClick={restartQuiz}>
              Повторить
            </Button>
            <Button size="medium" onClick={goToNextQuiz}>
              К следующему тесту
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  )
}

export default QuizPreviewCard
