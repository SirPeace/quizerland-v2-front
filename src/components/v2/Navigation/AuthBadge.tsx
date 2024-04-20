import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'

import type { ReactNode } from 'react'

import Card from '@/components/v2/UI/Card'
import { useAppSelector } from '@/redux/reduxHooks'

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

  const userAvatarUrl =
    user && `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${user.nickname}`

  return (
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
            <br />
            <em>@{user.nickname}</em>
          </p>
        </>
      )}
    </Badge>
  )
}
