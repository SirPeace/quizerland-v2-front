'use client'

import { Divider, FormControlLabel } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import RadioGroup from '@mui/material/RadioGroup'

import { useState } from 'react'

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

import type { IFormControlStyles, IHelperText, IQuizProps } from './types'

const AnswersRadioGroup = ({ quizItem }: IQuizProps): JSX.Element => {
	// Получили при переходе по на страницу (quiz) данные задачи ( quizItem )

	const [selected, setSelected] = useState<IAnswer | null>(null)
	const [attempts, setAttempts] = useState<Record<number, boolean>>({})

	const dispatch = useAppDispatch()

	const currentQuestion = quizItem?.questions.find(
		(question) => quizItem.currentQuestionId === question.id,
	)
	const correctAnswer = currentQuestion?.correctAnswerId
	const isCorrectAnswer = Object.values(attempts).includes(true)

	function getAnswerStyles(answer: IAnswer): IFormControlStyles {
		if (selected === null || (selected !== null && selected.id !== answer.id)) {
			return defaultAnswerStyles
		}

		if (!Object.hasOwn(attempts, answer.id) && selected.id === answer.id) {
			return checkedAnswerStyles
		}

		if (!attempts[answer.id]) return wrongAnswerStyles

		return correctAnswerStyles
	}

	const helperText = (): IHelperText => {
		const isZeroAttempts = Object.keys(attempts).length === 0

		if (isZeroAttempts) {
			return {
				text: 'Выбирайте с умом!',
				style: `text-gray-500 font-bold`,
			}
		}

		return match(isCorrectAnswer)
			.with(true, () => ({
				text: 'Отлично, правильный ответ!',
				style: 'text-green-500 font-bold',
			}))
			.otherwise(() => ({
				text: 'Неверный ответ!',
				style: 'text-red-500 font-bold',
			}))
	}

	const checkAnswer = (): void => {
		if (selected === null) return

		setAttempts((attempts) => ({
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
			<h3 className="m-0 p-3">{currentQuestion?.text}</h3>

			<Divider className="mx-2" />

			<form>
				<FormControl className="w-full p-3" variant="standard">
					<RadioGroup>
						{currentQuestion?.answers.map((answer) => (
							<Button
								key={answer.id}
								className="normal-case disabled:opacity-60"
								disabled={isCorrectAnswer}
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
						))}
					</RadioGroup>

					<FormHelperText
						className={`text-center text-base ${helperText().style}`}
					>
						{helperText().text}
					</FormHelperText>
					<div className="flex justify-between">
						<p className="text-sm font-semibold pl-5 text-gray-400">
							вопрос {quizItem?.currentQuestionId} из{' '}
							{quizItem?.questions.length}
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
export default AnswersRadioGroup
