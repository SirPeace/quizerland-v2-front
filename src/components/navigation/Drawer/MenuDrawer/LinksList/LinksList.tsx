import EditNoteIcon from '@mui/icons-material/EditNote'
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl'
import InputOutlinedIcon from '@mui/icons-material/InputOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { Divider } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { AxiosError } from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'

import { logout } from '@/api/modules/auth'
import { unsetUser } from '@/redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import { DrawerContext } from '../../Drawer'

import type { ILink } from './types'

const LinksList = (): JSX.Element => {
  const user = useAppSelector(({ authState }) => authState.user)
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { closeDrawer } = useContext(DrawerContext)

  const links: ILink[] = [
    {
      pathname: '/quizzes',
      query: { name: 'Тесты' },
      muiIcon: <FormatListNumberedRtlIcon />,
    },
    {
      pathname: '/create-quiz',
      query: { name: 'Создание тестов' },
      muiIcon: <EditNoteIcon />,
    },
  ]

  if (user === undefined) {
    links.push({
      pathname: '/auth',
      query: { name: 'Авторизация' },
      muiIcon: <InputOutlinedIcon />,
    })
  } else {
    links.push({
      pathname: '/',
      query: { name: 'Выход' },
      muiIcon: <LogoutIcon />,
    })
  }

  const logoutHandler = async (linkName: string): Promise<void> => {
    if (linkName !== 'Выход') {
      return
    }

    try {
      // запрос к db на инвалидацию пользователя
      await logout()

      dispatch(unsetUser())
      router.push('/quizzes')
    } catch (err: any) {
      if (err instanceof AxiosError) {
        const error = err.response?.data?.message
        console.error(error)
      } else {
        console.error('Произошла ошибка, обратитесь в тех. поддержку')
      }
    }
  }

  const setDisabled = (linkName: string): boolean => {
    if (
      (linkName === 'Создание тестов' || linkName === 'Тесты') &&
      user === undefined
    ) {
      return true
    }

    return false
  }

  return (
    <>
      {links.map(link => {
        const isActive = pathname === link.pathname

        return (
          <div key={link.pathname}>
            <ListItem
              className={
                setDisabled(link.query.name)
                  ? 'cursor-not-allowed'
                  : 'cursor-default'
              }
            >
              <ListItemButton
                disabled={setDisabled(link.query.name)}
                onClick={() => {
                  void logoutHandler(link.query.name)
                  router.push(link.pathname)
                  closeDrawer()
                }}
              >
                <ListItemIcon
                  className={`m-auto ${isActive && 'text-blue-700'}`}
                >
                  {link.muiIcon}
                </ListItemIcon>
                <ListItemText
                  className={`m-auto ${isActive && 'text-blue-700'}`}
                  primary={link.query.name}
                />
              </ListItemButton>
            </ListItem>

            {link.query.name === 'Создание тестов' && (
              <Divider className="w-64 mx-auto my-2" />
            )}
          </div>
        )
      })}
    </>
  )
}

export default LinksList
