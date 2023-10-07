'use client'

import { Divider, FormControlLabel } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import RadioGroup from '@mui/material/RadioGroup'

import { useMemo, useState } from 'react'

import { match } from 'ts-pattern'

import { nextQuestion } from '@/redux/quiz/quizSlice'
import type { IAnswer } from '@/redux/quiz/types'
import { useAppDispatch } from '@/redux/reduxHooks'

import {
	checkedAnswerStyles,
	correctAnswerStyles,
	defaultAnswerStyles,
	wrongAnswerStyles,
} from './styles'

import type {
	IFormControlStyles,
	IHelperText,
	IQuestionCardProps,
} from './types'

const QuestionCard = ({
	question,
	questionsLength,
}: IQuestionCardProps): JSX.Element => {
	const dispatch = useAppDispatch()

	const [selected, setSelected] = useState<IAnswer | null>(null)
	const [attempts, setAttempts] = useState<Record<number, boolean>>({})

	const correctAnswer = useMemo(() => question.correctAnswerId, [question])
	const isSelectedAnswerCorrect = useMemo(
		() => Object.values(attempts).includes(true),
		[attempts],
	)
	const helperText = useMemo((): IHelperText => {
		if (Object.keys(attempts).length === 0) {
			return {
				text: 'Выбирайте с умом!',
				style: `text-gray-500 font-bold`,
			}
		}

		return match(isSelectedAnswerCorrect)
			.with(true, () => ({
				text: 'Отлично, правильный ответ!',
				style: 'text-green-500 font-bold',
			}))
			.otherwise(() => ({
				text: 'Неверный ответ!',
				style: 'text-red-500 font-bold',
			}))
	}, [attempts, isSelectedAnswerCorrect])

	const getStylesForAnswer = (answer: IAnswer): IFormControlStyles => {
		const isSelected = selected?.id === answer.id
		const isAttempted = Object.hasOwn(attempts, answer.id)
		const isCorrect = attempts[answer.id]

		return match<boolean>(true)
			.with(!isSelected && !isAttempted, () => defaultAnswerStyles)
			.with(!isAttempted && isSelected, () => checkedAnswerStyles)
			.with(isCorrect, () => correctAnswerStyles)
			.otherwise(() => wrongAnswerStyles)
	}

	function checkAnswer(): void {
		if (selected === null) return

		setAttempts(attempts => ({
			...attempts,
			[selected.id]: selected.id === correctAnswer,
		}))

		if (selected.id === correctAnswer) {
			setTimeout(() => {
				setSelected(null)
				setAttempts({})
				dispatch(nextQuestion())
			}, 2000)
		}
	}

	return (
		<>
			<h3 className="m-0 p-3">{question.text}</h3>

			<Divider className="mx-2" />

			<form>
				<FormControl className="w-full p-3" variant="standard">
					<RadioGroup>
						{question.answers.map(answer => (
							<Button
								key={answer.id}
								className="normal-case disabled:opacity-60"
								disabled={
									isSelectedAnswerCorrect || Object.hasOwn(attempts, answer.id)
								}
							>
								<FormControlLabel
									value={answer.id}
									control={getStylesForAnswer(answer).icon}
									label={answer.text}
									className={`w-full m-0 ${getStylesForAnswer(answer).text}`}
									onClick={() => {
										setSelected(answer)
									}}
								/>
							</Button>
						))}
					</RadioGroup>

					<FormHelperText
						className={`text-center text-base ${helperText.style}`}
					>
						{helperText.text}
					</FormHelperText>
					<div className="flex justify-between">
						<p className="text-sm font-semibold pl-5 text-gray-400">
							вопрос {question.id} из {questionsLength}
						</p>
						<Button
							className="w-40 h-10 my-auto text"
							size="small"
							variant="contained"
							onClick={checkAnswer}
						>
							Проверить ответ
						</Button>
					</div>
				</FormControl>
			</form>
		</>
	)
}
export default QuestionCard
