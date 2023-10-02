import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import Radio from '@mui/material/Radio'

import type { IFormControlStyles } from './types'

export const defaultAnswerStyles: IFormControlStyles = {
	icon: <Radio className="text-blue-500" />,
	text: 'text-blue-400',
}

export const correctAnswerStyles: IFormControlStyles = {
	icon: (
		<VerifiedOutlinedIcon className="text-green-700" sx={{ margin: '9px' }} />
	),
	text: 'text-green-700',
}

export const wrongAnswerStyles: IFormControlStyles = {
	icon: (
		<HighlightOffOutlinedIcon className="text-red-400" sx={{ margin: '9px' }} />
	),
	text: 'text-red-400',
}
