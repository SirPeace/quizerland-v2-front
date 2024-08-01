import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Box, { type BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import type { IQuizResponse } from '@/api/modules/types'
import Button from '@/components/v2/UI/Button'

const ActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  columnGap: theme.spacing(3),
  marginTop: theme.spacing(4),
}))

interface CardActionsProps extends BoxProps {
  quiz: IQuizResponse['quizItem']
  quizProgress: IQuizResponse['progress']
}
function CardActions(props: CardActionsProps): JSX.Element {
  const { quiz, quizProgress, ...divProps } = props

  const canRestartQuiz: boolean = quizProgress.currentQuestionIndex !== -1

  function startQuiz(): void {
    //
  }

  function restartQuiz(): void {
    //
  }

  return (
    <ActionsContainer {...divProps}>
      {canRestartQuiz && (
        <Button variant="contained" onClick={restartQuiz}>
          <RestartAltIcon sx={{ mr: 1 }} />
          Начать заново
        </Button>
      )}
      <Button variant="contained" onClick={startQuiz}>
        <PlayArrowIcon sx={{ mr: 1 }} />
        {quizProgress.currentQuestionIndex === -1 ? 'Начать тест' : 'Продолжить тест'}
      </Button>
    </ActionsContainer>
  )
}

export default CardActions
