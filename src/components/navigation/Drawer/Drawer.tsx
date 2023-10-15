'use client'

import MenuIcon from '@mui/icons-material/Menu'
import { IconButton } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { useState, createContext } from 'react'

import MenuDrawer from './MenuDrawer/MenuDrawer'

interface IDrawerContext {
  closeDrawer: () => void
  toggleDrawer: () => void
}
export const DrawerContext = createContext<IDrawerContext>({
  closeDrawer() {},
  toggleDrawer() {},
})

const SlidingDrawer = (): JSX.Element => {
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
        onClick={() => {
          toggleDrawer()
        }}
        className="rounded-full fixed top-3 left-3 w-14 h-14 z-50"
        size="large"
        color="inherit"
        sx={{ padding: 0 }}
      >
        <MenuIcon className="w-8 h-8" />
      </IconButton>
      <Drawer anchor={'left'} open={isOpen} keepMounted onClose={closeDrawer}>
        <MenuDrawer />
      </Drawer>
    </DrawerContext.Provider>
  )
}

export default SlidingDrawer
