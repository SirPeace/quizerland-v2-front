'use client'

import { Box, Drawer as MUIDrawer } from '@mui/material'
import { useContext } from 'react'

import CreateQuizContext from '../context'

import DrawerContent from './DrawerContent'

export const DRAWER_WIDTH = 240

const Drawer = (): JSX.Element => {
  const { mobileDrawerOpen, setMobileDrawerOpen } =
    useContext(CreateQuizContext)

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <MUIDrawer
        variant="temporary"
        open={mobileDrawerOpen}
        onClose={() => {
          setMobileDrawerOpen(!mobileDrawerOpen)
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        <DrawerContent />
      </MUIDrawer>
      <MUIDrawer
        variant="permanent"
        className="h-full"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            zIndex: 0,
            position: 'relative',
          },
        }}
        open
      >
        <DrawerContent />
      </MUIDrawer>
    </Box>
  )
}

export default Drawer
