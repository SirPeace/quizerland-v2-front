import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'

import { Pacifico } from 'next/font/google'

import LinksList from './LinksList/LinksList'

const pacifico = Pacifico({ subsets: ['cyrillic'], weight: '400' })

interface IDrawerProps {
	toggleDrawer: () => void
}

const MenuDrawer: React.FC<IDrawerProps> = ({ toggleDrawer }) => (
	<Box
		role="presentation"
		onClick={() => {
			toggleDrawer()
		}}
		sx={{ width: 300 }}
	>
		<List>
			<div className="flex justify-between mb-2 h-16 ">
				<span className={`text-3xl m-auto ${pacifico.className}`}>
					Quizerland
				</span>

				<IconButton
					onClick={() => {
						toggleDrawer()
					}}
					className="rounded-full w-12 h-12 my-auto mr-3"
					color="inherit"
				>
					<CloseIcon />
				</IconButton>
			</div>

			<Divider className="w-64 mx-auto" />
			<LinksList />
		</List>
	</Box>
)

export default MenuDrawer
