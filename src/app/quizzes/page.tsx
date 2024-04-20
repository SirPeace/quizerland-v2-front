'use client'

import { styled } from '@mui/material/styles'

import MainLayout from '@/components/v2/Layouts/MainLayout'
import QuizzesList from '@/components/v2/QuizzesList'
import useAdaptive from '@/hooks/useAdaptive'
import { useAppSelector } from '@/redux/reduxHooks'

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(4, 4, 0, 4),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(2, 2, 0, 2),
  },
}))
const Heading = styled('h1')(({ theme }) => ({
  ...theme.typography.h1,
  marginBottom: theme.spacing(4),
  '& > b': {
    color: theme.palette.info.main,
  },
}))

function QuizzesPage(): JSX.Element {
  const userNickname = useAppSelector(({ authState }) => authState.user?.nickname)

  const { isTabletOrDown } = useAdaptive()

  return (
    <MainLayout>
      <Container>
        {!isTabletOrDown && (
          <Heading>
            Ваша подборка тестов, <b>@{userNickname}</b>
          </Heading>
        )}
        <QuizzesList sx={{ flexGrow: 1 }} />
      </Container>
    </MainLayout>
  )
}

export default QuizzesPage
