import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Avatar } from '@mui/material'
import Box, { type BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { match } from 'ts-pattern'

import type { IProgressResponse, IQuizResponse } from '@/api/modules/types'
import CardActions from '@/components/v2/QuizPreviewCard/CardActions'
import Button from '@/components/v2/UI/Button'
import Card from '@/components/v2/UI/Card'

import Link from '@/components/v2/UI/Link'

import type { CardProps } from '@mui/material/Card'

const QuizTitle = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}))
const QuizDescription = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}))
const QuizMeta = styled(Box)(({ theme }) => ({
  '> *': {
    marginBottom: theme.spacing(1),
  },
}))
const QuizProgress = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.info.main,
  borderRadius: theme.shape.borderRadius * 2,
  display: 'flex',
}))

const QuizProgressPoints = (props: { rightCount: number; wrongCount: number }): JSX.Element => (
  <ul>
    <li>
      <CheckCircleIcon />
      {props.rightCount} правильных ответов
    </li>
    <li>
      <CancelIcon />
      {props.wrongCount} неверных ответов
    </li>
  </ul>
)

interface QuizPreviewCardProps extends BoxProps {
  quiz: IQuizResponse['quizItem']
  quizProgress: IQuizResponse['progress']
  noActions: boolean
  CardProps: CardProps
}
function QuizPreviewCard(props: QuizPreviewCardProps): JSX.Element {
  const { quiz, quizProgress, noActions, CardProps, ...boxProps } = props

  const questionsCount: number = quiz.questions.length
  const questionsLeft: number = questionsCount / (quizProgress.currentQuestionIndex + 1)

  const rightAttempts: number = quizProgress.rightAttempts
  const wrongAttempts: number = questionsCount - quizProgress.rightAttempts
  const successRate: number = Math.round(rightAttempts / questionsCount) * 100

  return (
    <Box {...boxProps}>
      <Card {...CardProps}>
        <QuizTitle>
          <Typography variant="h3">{quiz.title}</Typography>
          <Typography variant="subtitle1">Тест из {quiz.questions.length} вопросов</Typography>
        </QuizTitle>

        <QuizDescription>{quiz.description}</QuizDescription>

        <QuizMeta>
          <Typography>
            <b>Последнее обновление:</b> <code>{'updatedAt'}</code>
          </Typography>
          <Typography>
            <b>Автор теста:</b>
            <Link>
              <Avatar sx={{ mr: 1 }} /> @{'not_found_user'}
            </Link>
          </Typography>
        </QuizMeta>

        <QuizProgress>
          <PersonSearchIcon />
          <div>
            <Typography variant="h4">Ваш результат</Typography>
            {match<IProgressResponse, JSX.Element>(quizProgress)
              .with({ isFinished: true }, () => (
                <>
                  <Typography>
                    Вы прошли данный тест с результатом {successRate}% правильных ответов
                  </Typography>
                  <QuizProgressPoints rightCount={rightAttempts} wrongCount={wrongAttempts} />
                </>
              ))
              .with({ currentQuestionIndex: 0 }, () => (
                <Typography>Вы еще не проходили этот тест.</Typography>
              ))
              .otherwise(() => (
                <>
                  <Typography>
                    Вы в процессе прохождения данного теста. Осталось ответить на {questionsLeft}{' '}
                    вопросов.
                  </Typography>
                  <QuizProgressPoints rightCount={rightAttempts} wrongCount={wrongAttempts} />
                </>
              ))}
          </div>
        </QuizProgress>
      </Card>

      {!noActions && <CardActions quiz={quiz} quizProgress={quizProgress} />}
    </Box>
  )
}

export default QuizPreviewCard
