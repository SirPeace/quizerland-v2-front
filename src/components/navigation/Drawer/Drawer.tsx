import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LinksList from './LinksList/LinksList'
import MenuIcon from '@mui/icons-material/Menu'

const MenuDrawer = () => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
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
				onClick={toggleDrawer(isOpen)}
				className='rounded-full fixed top-3 left-3'
				size='large'
			>
				<MenuIcon />
			</Button>
			<Drawer
				anchor={'left'}
				open={isOpen}
				onClose={toggleDrawer(isOpen)}
			>
				<LinksList
					open={isOpen}
					toggleDrawer={toggleDrawer}
				/>
			</Drawer>
		</>
	)
}

export default MenuDrawer
