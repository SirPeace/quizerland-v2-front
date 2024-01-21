'use client'

import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import { Box, Button } from '@mui/material'
import { useContext } from 'react'

import GoToHomePageButton from '@/components/Navigation/GoToHomePageButton'

import Drawer, { DRAWER_WIDTH } from './Drawer'
import QuestionCard from './QuestionCard'
import QuizDescriptionCard from './QuizDescriptionCard'
import { QuizFormContext } from './QuizFormContext'

const QuizForm = (): JSX.Element => {
  const { activeTab, mobileDrawerOpen, setMobileDrawerOpen } =
    useContext(QuizFormContext)

  return (
    <Box className="flex h-screen">
      <Button
        className="fixed bottom-3 left-3 rounded-full p-0 min-w-0 w-14 h-14 z-50 items-center"
        size="small"
        color="primary"
        variant="contained"
        sx={{ display: { xs: 'flex', sm: 'none' } }}
        onClick={() => {
          setMobileDrawerOpen(!mobileDrawerOpen)
        }}
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
  )
}

export default QuizForm
