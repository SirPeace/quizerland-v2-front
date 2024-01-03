'use client'

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PersonIcon from '@mui/icons-material/Person'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import {
  deleteQuizProgress,
  getNextIncompleteQuiz,
} from '@/api/modules/quizzes'
import { resetCurrentQuestion, setIsPreview } from '@/redux/quiz/quizSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'
import { getFormattedDate } from '@/utils/getFormattedDate'

import { containerDesktopStyle, containerLaptopStyle } from './styles'

import type { FC } from 'react'

const QuizPreviewCard: FC = () => {
  const theme = useTheme()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))

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
    <div className={isNotMobile ? containerDesktopStyle : containerLaptopStyle}>
      <div>
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
          title={
            <>
              <Typography variant="body1">
                Автор теста: {user?.nickname}
              </Typography>
              <Typography variant="body2">Email: {user?.email}</Typography>
            </>
          }
        />
        <div className="flex flex-col">
          <Typography variant="subtitle2" className="ml-[1rem] ">
            Дата создания теста: {quizCreationDate.date}
          </Typography>
          <Typography variant="subtitle2" className="ml-[1rem] ">
            Детали: {quizCreationDate.day}
          </Typography>
        </div>
      </div>

      <CardContent>
        <div className="border-solid border border-slate-300 px-[1rem] mb-[1rem] rounded-md">
          <Typography
            gutterBottom
            variant={isNotMobile ? 'h5' : 'h6'}
            component="div"
            className="text-left indent-2 pt-2"
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
        </div>

        {!quiz.isFinished ? (
          <div
            className={
              isNotMobile
                ? 'flex justify-between mt-[1rem]'
                : 'flex flex-col items-center'
            }
          >
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
                ? 'Прогресс: Вы не проходили этот тест'
                : `Прогресс: ${quiz.currentQuestionIndex + 1}-й вопрос`}
            </Typography>
          </div>
        ) : (
          <div className={isNotMobile ? '' : 'flex flex-col'}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className={
                isNotMobile
                  ? 'mt-[0.5rem] ml-[1rem] text-gray-500'
                  : 'mt-[0.5rem] text-gray-500 text-center'
              }
            >
              Результат теста
            </Typography>

            <RadioGroup className={isNotMobile ? 'mx-4 mt-2 ' : 'mx-auto'}>
              <FormControlLabel
                control={
                  <HighlightOffOutlinedIcon
                    className="text-red-400"
                    sx={{ margin: '9px' }}
                  />
                }
                className="text-red-400 cursor-auto"
                label={`Неверные ответы : ${wrongAnswersCount}`}
              />

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
          </div>
        )}
      </CardContent>

      <CardActions className={isNotMobile ? '' : 'flex flex-col'}>
        {!quiz.isFinished ? (
          <div
            className={isNotMobile ? 'flex ml-auto' : 'w-full fixed bottom-0'}
          >
            <Button
              size={isNotMobile ? 'medium' : 'large'}
              variant={isNotMobile ? 'text' : 'contained'}
              fullWidth={!isNotMobile}
              className="mr-[0.5rem]"
              onClick={() => {
                dispatch(setIsPreview(false))
              }}
            >
              Пройти тест
            </Button>
          </div>
        ) : (
          <div className={isNotMobile ? '' : 'w-full'}>
            <Button
              size={isNotMobile ? 'medium' : 'large'}
              fullWidth={!isNotMobile}
              variant={isNotMobile ? 'text' : 'contained'}
              className={isNotMobile ? 'mr-3' : ' bg-orange-500'}
              onClick={restartQuiz}
            >
              Повторить
            </Button>
            <Button
              size={isNotMobile ? 'medium' : 'large'}
              fullWidth={!isNotMobile}
              variant={isNotMobile ? 'text' : 'contained'}
              className={isNotMobile ? 'mr-3' : 'mt-1'}
              onClick={goToNextQuiz}
            >
              К следующему тесту
            </Button>
          </div>
        )}
      </CardActions>
    </div>
  )
}

export default QuizPreviewCard
