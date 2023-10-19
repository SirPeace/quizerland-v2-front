'use client'

import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { useState } from 'react'

import GoToHomePageButton from '../Navigation/GoToHomePageButton/GoToHomePageButton'

import QuizDescriptionForm from './QuizDescriptionForm/QuizDescriptionForm'
import QuizQuestionForm from './QuizQuestionForm/QuizQuestionForm'
import CreateQuizContext from './context'

const drawerWidth = 240

const DrawerList = (
  <Box sx={{ mt: { sm: 10, xs: 0 } }}>
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
)

const CreateQuiz = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <CreateQuizContext.Provider value={{ activeTab, setActiveTab }}>
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
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
            {DrawerList}
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
            {DrawerList}
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

            {activeTab === 0 ? <QuizDescriptionForm /> : <QuizQuestionForm />}
          </div>
        </Box>
      </Box>
    </CreateQuizContext.Provider>
  )
}

export default CreateQuiz
