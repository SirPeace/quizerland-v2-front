'use client'
// TODO Убрать DevTool
// import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import GoToHomePageButton from '../Navigation/GoToHomePageButton/GoToHomePageButton'

import DrawerList from './DrawerList/DrawerList'
import QuestionCard from './QuestionCard/QuestionCard'
import QuizDescriptionCard from './QuizDescriptionCard/QuizDescriptionCard'
import CreateQuizContext, { type ICreateQuizContext } from './context'

import { quizFormSchema, type TQuizForm } from './types'

const drawerWidth = 240

const QuizForm = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(-1)

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

  // Обертка для вызова `handleSubmit(data => onSubmit(data))()` у RHF
  // Раньше вызывал при событии на элементе, но его можно вызвать и программно
  const submit = async (): Promise<void> => {
    await form.handleSubmit(data => {
      console.log(data)
    })()
  }

  const formContext: ICreateQuizContext = {
    activeTab,
    setActiveTab,
    form,
    submit,
  }

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <CreateQuizContext.Provider value={formContext}>
      <Box className="flex h-screen">
        {/* <DevTool control={form.control} placement="top-right" /> */}
        <Button
          onClick={handleDrawerToggle}
          className="fixed bottom-3 left-3 rounded-full p-0 min-w-0 w-14 h-14 z-50 items-center"
          size="small"
          color="primary"
          variant="contained"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
        >
          <ChecklistOutlinedIcon className="w-7 h-7 text-white" />
        </Button>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <DrawerList />
          </Drawer>
          <Drawer
            variant="permanent"
            className="h-full"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                zIndex: 0,
                position: 'relative',
              },
            }}
            open
          >
            <DrawerList />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
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
