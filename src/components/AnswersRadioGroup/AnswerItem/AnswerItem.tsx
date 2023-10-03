import { Button, FormControlLabel } from '@mui/material'

import type { IAnswer } from '@/redux/quiz/types'

import type { IFormControlStyles } from '../types'
import type { Dispatch, SetStateAction } from 'react'

interface AnswerItemProps {
	answer: IAnswer
	isCorrect: boolean
	getAnswerStyles: (answer: IAnswer) => IFormControlStyles
	setSelected: Dispatch<SetStateAction<IAnswer | null>>
}

const AnswerItem = ({
	answer,
	getAnswerStyles,
	isCorrect,
	setSelected,
}: AnswerItemProps): JSX.Element => (
	<Button
		key={answer.id}
		className="normal-case disabled:opacity-60"
		disabled={isCorrect}
	>
		<FormControlLabel
			value={answer.id}
			control={getAnswerStyles(answer).icon}
			label={answer.text}
			className={`w-full m-0 ${getAnswerStyles(answer).text}`}
			onClick={() => {
				setSelected(answer)
			}}
		/>
	</Button>
)

export default AnswerItem
