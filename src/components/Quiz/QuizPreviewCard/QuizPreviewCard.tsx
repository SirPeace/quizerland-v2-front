'use client'

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import PersonIcon from '@mui/icons-material/Person'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import {
  CardActions,
  Button,
  Divider,
  FormControlLabel,
  RadioGroup,
} from '@mui/material'

import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import {
  deleteQuizProgress,
  getNextIncompleteQuiz,
} from '@/api/modules/quizzes'
import { resetCurrentQuestion, setIsPreview } from '@/redux/quiz/quizSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

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
  // TODO User для карточки пока как заглушка, переделать на реального юзера создавшего тест
  const { userNickname, userEmail } = useAppSelector(({ authState }) => {
    const user = authState.user
    const userNickname = user?.nickname
    const userEmail = user?.email

    return { userNickname, userEmail }
  })

  const {
    correctAnswersCount,
    wrongAnswersCount,
    quiz,
    isFinished,
    quizTitle,
    quizDescription,
    questionsCount,
    currentQuestion,
  } = useAppSelector(({ quizState }) => {
    const quiz = quizState
    const questionsCount = quiz.questions.length ?? 0
    const correctAnswersCount = quiz.rightAttempts ?? 0
    const wrongAnswersCount = questionsCount - correctAnswersCount
    const isFinished = quiz.isFinished
    const quizTitle = quiz.title
    const quizDescription = quiz.description
    const currentQuestion = quiz.currentQuestionIndex

    return {
      wrongAnswersCount,
      correctAnswersCount,
      quiz,
      isFinished,
      quizTitle,
      quizDescription,
      questionsCount,
      currentQuestion,
    }
  })

  const dispatch = useAppDispatch()

  const router = useRouter()

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
    dispatch(setIsPreview(false))
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
        title={`Автор теста: ${userNickname} ( email: ${userEmail} ) .`}
        subheader="Дата создания теста: 14 Сентября 2016 ."
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-left indent-2"
        >
          {quizTitle}
        </Typography>

        <Divider />

        <Typography
          variant="body1"
          color="text.secondary"
          className="indent-2 text-justify my-[1rem]"
        >
          {quizDescription}
        </Typography>

        <Divider />

        {!isFinished ? (
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
              {currentQuestion === 0
                ? 'Прогресс: Тест не пройден'
                : `Прогресс: ${currentQuestion}-й вопрос`}
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
        {!isFinished ? (
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
