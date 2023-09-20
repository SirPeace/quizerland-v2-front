import MenuIcon from '@mui/icons-material/Menu'
import { IconButton } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'

import MenuDrawer from './Drawer/MenuDrawer'

const SlidingDrawer = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const toggleDrawer = (): void => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<IconButton
				onClick={() => {
					toggleDrawer()
				}}
				className="rounded-full fixed top-3 left-3 w-14 h-14"
				size="large"
				color="inherit"
				sx={{ padding: 0 }}
			>
				<MenuIcon className="w-8 h-8" />
			</IconButton>
			<Drawer
				anchor={'left'}
				open={isOpen}
				onClose={() => {
					toggleDrawer()
				}}
			>
				<MenuDrawer toggleDrawer={toggleDrawer} />
			</Drawer>
		</>
	)
}

export default SlidingDrawer
