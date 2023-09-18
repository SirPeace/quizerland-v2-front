import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'

import LinksList from './LinksList/LinksList'

const MenuDrawer = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const toggleDrawer =
		() => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return
			}

			setIsOpen(!isOpen)
		}

	return (
		<>
			<Button
				onClick={toggleDrawer()}
				className="rounded-full fixed top-3 left-3"
				size="large"
			>
				<MenuIcon />
			</Button>
			<Drawer anchor={'left'} open={isOpen} onClose={toggleDrawer()}>
				<LinksList toggleDrawer={toggleDrawer} />
			</Drawer>
		</>
	)
}

export default MenuDrawer
