'use client'

import CloseIcon from '@mui/icons-material/Close'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import MenuIcon from '@mui/icons-material/Menu'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import {
  Box,
  Divider,
  List,
  IconButton,
  Typography,
  Drawer,
} from '@mui/material'
import { Pacifico } from 'next/font/google'
import { useState } from 'react'

import { useAppSelector } from '@/redux/reduxHooks'

import LinksList from './LinksList'
import DrawerContext from './context'

const pacifico = Pacifico({ subsets: ['cyrillic'], weight: '400' })

const SlidingDrawer = (): JSX.Element => {
  const { user } = useAppSelector(({ authState }) => authState)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleDrawer = (): void => {
    setIsOpen(!isOpen)
  }
  const closeDrawer = (): void => {
    setIsOpen(false)
  }

  const context = {
    toggleDrawer,
    closeDrawer,
  }

  return (
    <DrawerContext.Provider value={context}>
      <IconButton
        onClick={toggleDrawer}
        className="rounded-full fixed top-3 left-3 w-14 h-14 z-50"
        size="large"
        color="inherit"
        sx={{ padding: 0 }}
      >
        <MenuIcon className="w-8 h-8" />
      </IconButton>
      <Drawer anchor={'left'} open={isOpen} keepMounted onClose={closeDrawer}>
        <Box
          role="presentation"
          sx={{ width: 300 }}
          className="h-full flex flex-col justify-between"
        >
          <List>
            <span className="flex justify-between mb-2 h-16">
              <span className={`text-3xl m-auto ${pacifico.className}`}>
                Quizerland
              </span>

              <IconButton
                onClick={closeDrawer}
                className="rounded-full w-12 h-12 my-auto mr-3"
                color="inherit"
              >
                <CloseIcon />
              </IconButton>
            </span>

            <Divider className="w-64 mx-auto" />
            <LinksList />
          </List>

          {user !== undefined ? (
            <Box
              sx={{ bgcolor: 'primary.main' }}
              className="flex items-center p-4"
              color="white"
            >
              <HowToRegIcon className="mr-3" />

              <Box>
                <Typography variant="body1">
                  Вы вошли как: <strong>{user.nickname}</strong>
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{ bgcolor: 'error.main' }}
              className="flex items-center p-4"
              color="white"
            >
              <PersonOffIcon className="mr-3" />

              <Box>
                <Typography variant="body1">
                  Требуется вход в систему
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </DrawerContext.Provider>
  )
}

export default SlidingDrawer
