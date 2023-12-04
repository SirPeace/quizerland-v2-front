'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { createQuiz } from '@/api/modules/quizzes'
import GoToHomePageButton from '@/components/Navigation/GoToHomePageButton'
import useError from '@/hooks/useError'

import Drawer, { DRAWER_WIDTH } from './Drawer'
import QuestionCard from './QuestionCard'
import QuizDescriptionCard from './QuizDescriptionCard'
import CreateQuizContext, { type ICreateQuizContext } from './context'
import { quizFormSchema, type TQuizForm } from './types'

const QuizForm = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(-1)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const { setErrorSnackbar } = useError()

  const form = useForm<TQuizForm>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: '',
      description: '',
      questions: [
        {
          text: '',
          rightAnswerId: undefined,
          answers: ['', '', ''],
        },
      ],
    },
  })

  const submit = async (): Promise<void> => {
    await form.handleSubmit(data => {
      void createQuiz(data).catch(setErrorSnackbar)
    })()
  }

  const formContext: ICreateQuizContext = {
    mobileDrawerOpen,
    setMobileDrawerOpen,
    activeTab,
    setActiveTab,
    form,
    submit,
  }

  return (
    <CreateQuizContext.Provider value={formContext}>
      <Box className="flex h-screen">
        <Button
          onClick={() => {
            setMobileDrawerOpen(!mobileDrawerOpen)
          }}
          className="fixed bottom-3 left-3 rounded-full p-0 min-w-0 w-14 h-14 z-50 items-center"
          size="small"
          color="primary"
          variant="contained"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
        >
          <ChecklistOutlinedIcon className="w-7 h-7 text-white" />
        </Button>

        <Drawer />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          }}
        >
          <div className="max-w-4xl min-h-screen mx-auto">
            <h1 className="pb-10 pt-10 mt-0 text-center">Создание теста</h1>
            <GoToHomePageButton />

            {activeTab === -1 ? <QuizDescriptionCard /> : <QuestionCard />}
          </div>
        </Box>
      </Box>
    </CreateQuizContext.Provider>
  )
}

export default QuizForm
