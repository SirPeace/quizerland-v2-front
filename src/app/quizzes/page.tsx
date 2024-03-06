'use client'

import { styled } from '@mui/material/styles'

import MainLayout from '@/components/v2/Layouts/MainLayout'
import QuizzesList from '@/components/v2/QuizzesList'

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(4, 4, 0, 4),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}))
const Heading = styled('h1')(({ theme }) => ({
  ...theme.typography.h1,
  marginBottom: theme.spacing(4),
  '& > b': {
    color: theme.palette.info.main,
  },
}))

function QuizzesPage(): JSX.Element {
  return (
    <MainLayout>
      <Container>
        <Heading>
          Ваша подборка тестов, <b>@logged_in_user</b>
        </Heading>
        <QuizzesList sx={{ flexGrow: 1 }} />
      </Container>
    </MainLayout>
  )
}

export default QuizzesPage
