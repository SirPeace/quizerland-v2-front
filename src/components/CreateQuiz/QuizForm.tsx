'use client'

import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import { useContext, useState } from 'react'

import GoToHomePageButton from '../Navigation/GoToHomePageButton/GoToHomePageButton'

import DrawerList from './DrawerList/DrawerList'
import QuestionCard from './QuestionCard/QuestionCard'
import QuizDescriptionCard from './QuizDescriptionCard/QuizDescriptionCard'
import { QuizFormContext } from './QuizFormContext'

const drawerWidth = 240

const QuizForm = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { activeTab } = useContext(QuizFormContext)

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box className="flex h-screen">
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
  )
}

export default QuizForm
