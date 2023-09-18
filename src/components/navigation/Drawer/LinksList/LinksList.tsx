import CloseIcon from '@mui/icons-material/Close'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

interface IDrawerProps {
	toggleDrawer: (
		open: boolean,
	) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

const LinksList: React.FC<IDrawerProps> = ({ toggleDrawer }) => (
	<Box
		role="presentation"
		onClick={toggleDrawer(false)}
		onKeyDown={toggleDrawer(false)}
		sx={{ width: 300 }}
	>
		<List>
			<Button
				onClick={toggleDrawer(false)}
				className="rounded-full"
				size="large"
			>
				<CloseIcon />
			</Button>
		</List>
		<Divider />

		<List>
			{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
				<ListItem key={text} disablePadding>
					<ListItemButton>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
		<Divider />
		<List>
			{['All mail', 'Trash', 'Spam'].map((text, index) => (
				<ListItem key={text} disablePadding>
					<ListItemButton>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	</Box>
)

export default LinksList
