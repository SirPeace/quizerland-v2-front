import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'

import { Pacifico } from 'next/font/google'
import { useContext } from 'react'

import { DrawerContext } from '../Drawer'

import LinksList from './LinksList/LinksList'

const pacifico = Pacifico({ subsets: ['cyrillic'], weight: '400' })

const MenuDrawer: React.FC = () => {
	const { closeDrawer } = useContext(DrawerContext)

	return (
		<Box role="presentation" sx={{ width: 300 }}>
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
		</Box>
	)
}

export default MenuDrawer
