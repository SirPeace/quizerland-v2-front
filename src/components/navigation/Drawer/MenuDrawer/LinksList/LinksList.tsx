import EditNoteIcon from '@mui/icons-material/EditNote'
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl'
import InputOutlinedIcon from '@mui/icons-material/InputOutlined'
import { Divider } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { usePathname, useRouter } from 'next/navigation'

import type { ILink } from './types'

const LinksList = (): JSX.Element => {
	const pathname = usePathname()
	const router = useRouter()

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
		{
			pathname: '/auth',
			query: { name: 'Авторизация' },
			muiIcon: <InputOutlinedIcon />,
		},
	]

	return (
		<>
			{links.map((link, idx) => {
				const isActive = pathname === link.pathname

				return (
					<div key={`${link.query.name}${idx}`}>
						<ListItem
							onClick={() => {
								router.push(link.pathname)
							}}
						>
							<ListItemButton>
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
