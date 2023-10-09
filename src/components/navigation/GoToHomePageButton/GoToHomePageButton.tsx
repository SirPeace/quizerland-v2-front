import Button from '@mui/material/Button'
import Link from 'next/link'

const GoToHomePageButton = (): JSX.Element => (
	<div className="ml-5">
		<Button variant="text">
			<Link href="/" className="text-blue-500">
				На домашнюю страницу
			</Link>
		</Button>
	</div>
)

export default GoToHomePageButton
