import CloseIcon from '@mui/icons-material/Close'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'

import { Pacifico } from 'next/font/google'
import { useContext } from 'react'

import { useAppSelector } from '@/redux/reduxHooks'

import { DrawerContext } from '../Drawer'

import LinksList from './LinksList/LinksList'

const pacifico = Pacifico({ subsets: ['cyrillic'], weight: '400' })

const MenuDrawer: React.FC = () => {
  const { user } = useAppSelector(({ authState }) => authState)

  const { closeDrawer } = useContext(DrawerContext)

  return (
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
            <Typography variant="body1">Пользователь не авторизован</Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default MenuDrawer
