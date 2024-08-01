import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import Card from '@/components/v2/UI/Card'
import Link from '@/components/v2/UI/Link'
import useError from '@/hooks/useError'
import { signOutUser } from '@/redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import type { ReactNode } from 'react'

const Badge = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,

  '> p': {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,

    '> em': {
      color: theme.palette.info.main,
      fontStyle: 'normal',
      fontWeight: 700,
    },
  },
}))

export default function AuthBadge(): ReactNode {
  const { user } = useAppSelector(({ authState }) => authState)
  const dispatch = useAppDispatch()

  const { setErrorSnackbar } = useError()

  const userAvatarUrl =
    user !== undefined
      ? `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${user.nickname}`
      : ''

  async function handleLogout(): Promise<void> {
    try {
      await dispatch(signOutUser())
    } catch (err) {
      setErrorSnackbar(err)
    }
  }

  return (
    <div>
      <Badge>
        {user === undefined ? (
          <>
            <Avatar sx={theme => ({ marginRight: theme.spacing(2) })} />
            <span>Гость</span>
          </>
        ) : (
          <>
            <Avatar sx={theme => ({ marginRight: theme.spacing(2) })} src={userAvatarUrl} />
            <p>
              <span>Пользователь:</span>
              <em>@{user.nickname}</em>
            </p>
          </>
        )}
      </Badge>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link onClick={handleLogout}>Выйти</Link>
      </Box>
    </div>
  )
}
