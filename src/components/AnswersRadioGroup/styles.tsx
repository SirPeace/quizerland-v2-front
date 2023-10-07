import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'

import type { IFormControlStyles } from './types'

export const defaultAnswerStyles: IFormControlStyles = {
	icon: (
		<RadioButtonUncheckedIcon
			className="text-blue-500"
			sx={{ margin: '9px' }}
		/>
	),
	text: 'text-blue-400',
}

export const checkedAnswerStyles: IFormControlStyles = {
	icon: (
		<RadioButtonCheckedIcon className="text-blue-500" sx={{ margin: '9px' }} />
	),
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
