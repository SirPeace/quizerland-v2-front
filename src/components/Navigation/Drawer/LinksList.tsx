import {
  EditNote,
  FormatListNumberedRtl,
  InputOutlined,
  Logout,
} from '@mui/icons-material'
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useMemo } from 'react'

import { logout } from '@/api/modules/auth'
import useError from '@/hooks/useError'
import { unsetUser } from '@/redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import DrawerContext from './context'

interface ILink {
  pathname?: '/quizzes' | '/create-quiz' | '/auth'
  name: string
  icon: JSX.Element
  disabled?: boolean
  hidden?: boolean
}

const LinksList = (): JSX.Element => {
  const user = useAppSelector(({ authState }) => authState.user)
  const dispatch = useAppDispatch()

  const router = useRouter()
  const pathname = usePathname()

  const { closeDrawer } = useContext(DrawerContext)

  const { setErrorSnackbar } = useError()

  const links: ILink[] = useMemo((): ILink[] => {
    const links: ILink[] = [
      {
        pathname: '/quizzes',
        name: 'Тесты',
        icon: <FormatListNumberedRtl />,
        disabled: user === undefined,
      },
      {
        pathname: '/create-quiz',
        name: 'Создание тестов',
        icon: <EditNote />,
        disabled: user === undefined,
      },
      {
        pathname: '/auth',
        name: 'Авторизация',
        icon: <InputOutlined />,
        hidden: user !== undefined,
      },
      {
        name: 'Выход',
        icon: <Logout />,
        hidden: user === undefined,
      },
    ]

    return links.filter(link => link.hidden !== true)
  }, [user])

  const handleLogout = async (): Promise<void> => {
    try {
      await logout()
      dispatch(unsetUser())
      router.push('/quizzes')

      router.push('/auth')
      closeDrawer()
    } catch (err: any) {
      setErrorSnackbar(err)
    }
  }

  const handleLinkClick = (link: ILink): void => {
    if (link.name === 'Выход') {
      void handleLogout()
    } else if (link.pathname !== undefined) {
      router.push(link.pathname)
    }
  }

  const isDisabled = (linkName: string): boolean => {
    if (user === undefined) {
      return ['Создание тестов', 'Тесты'].includes(linkName)
    }
    return false
  }

  return (
    <ul className="list-none pl-0">
      {links.map((link, index) => {
        const isActive = pathname === link.pathname

        return (
          <div key={link.pathname ?? index}>
            <ListItem
              className={
                isDisabled(link.name) ? 'cursor-not-allowed' : 'cursor-default'
              }
            >
              <ListItemButton
                disabled={isDisabled(link.name)}
                onClick={() => {
                  handleLinkClick(link)
                }}
              >
                <ListItemIcon
                  className={`m-auto ${isActive && 'text-blue-700'}`}
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  className={`m-auto ${isActive && 'text-blue-700'}`}
                  primary={link.name}
                />
              </ListItemButton>
            </ListItem>

            {link.name === 'Создание тестов' && (
              <Divider className="w-64 mx-auto my-2" />
            )}
          </div>
        )
      })}
    </ul>
  )
}

export default LinksList
