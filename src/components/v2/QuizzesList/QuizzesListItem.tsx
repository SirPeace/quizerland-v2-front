import StartIcon from '@mui/icons-material/PlayArrow'
import ShareIcon from '@mui/icons-material/Share'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'

import type { IQuizzesItem } from '@/api/modules/types'
import Button from '@/components/v2/UI/Button'

import Card from '@/components/v2/UI/Card'
import FabButton from '@/components/v2/UI/FabButton'
import Link from '@/components/v2/UI/Link'
import Separator from '@/components/v2/UI/Separator'

import type { CardProps } from '@mui/material/Card'

const QuizCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(3),
  paddingRight: theme.spacing(2),
}))
const ContentSection = styled('section')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})
const ContentBody = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
}))
const AuthorCaption = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  fontWeight: 800,
}))
const AuthorAvatar = styled(Avatar)({
  display: 'inline-block',
  width: 26,
  height: 26,
  margin: '0 4px',
})
const ActionsSection = styled('section')(({ theme }) => ({
  '> button': {
    display: 'flex',
  },
  '> :not(:last-child)': {
    marginBottom: theme.spacing(1),
  },
}))
const CompactActionsSection = styled('section')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}))

interface QuizzesListItemProps extends CardProps {
  quiz: IQuizzesItem
  compact?: boolean
}
function QuizzesListItem(props: QuizzesListItemProps): JSX.Element {
  const { quiz, compact, ...cardProps } = props

  const { push } = useRouter()

  const quizCardSx = Object.assign(cardProps.sx ?? {}, {
    flexDirection: compact === true ? 'column' : 'row',
  })

  function onClickStart(): void {
    push(`/quizzes/${quiz.id}`)
  }

  return (
    <QuizCard component="article" {...cardProps} sx={quizCardSx}>
      <ContentSection>
        <div>
          <Typography variant="h3">{quiz.title}</Typography>
          <Separator />
        </div>

        <ContentBody variant="body1">{quiz.description}</ContentBody>

        <AuthorCaption variant="caption">
          Автор:
          <AuthorAvatar src="https://images.unsplash.com/photo-1568431477192-52bb13a55088?q=80&w=100&auto=format&fit=crop" />
          <Link>@nickname</Link>
        </AuthorCaption>
      </ContentSection>

      {compact === true ? (
        <CompactActionsSection>
          <FabButton color="secondary">
            <ShareIcon />
          </FabButton>

          <Button color="primary" variant="contained" size="small" onClick={onClickStart}>
            <StartIcon />
            Начать тест
          </Button>
        </CompactActionsSection>
      ) : (
        <ActionsSection>
          <FabButton color="primary" size="small" onClick={onClickStart}>
            <StartIcon />
          </FabButton>

          <FabButton color="secondary" size="small">
            <ShareIcon />
          </FabButton>
        </ActionsSection>
      )}
    </QuizCard>
  )
}

export default QuizzesListItem
