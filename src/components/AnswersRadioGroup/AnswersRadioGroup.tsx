'use client'

import { Divider } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import RadioGroup from '@mui/material/RadioGroup'

import { useMemo, useState } from 'react'

import { match } from 'ts-pattern'

import type { IAnswer } from '@/redux/quiz/types'

import AnswerItem from './AnswerItem/AnswerItem'
import {
	correctAnswerStyles,
	defaultAnswerStyles,
	wrongAnswerStyles,
} from './styles'

import type { IFormControlStyles, IQuizProps, IHelperText } from './types'

const AnswersRadioGroup = ({ quiz }: IQuizProps): JSX.Element => {
	const currentQuestion = quiz?.questions.find(
		(question) => question.id === quiz.currentQuestionId,
	)
	const correctAnswer = currentQuestion?.correctAnswerId

	const [selected, setSelected] = useState<IAnswer | null>(null)
	const [attempts, setAttempts] = useState<Record<number, boolean>>({})

	const AnswerItemMemo = useMemo(() => AnswerItem, [])

	const isZeroAttempts = useMemo(
		() => Object.keys(attempts).length === 0,
		[attempts],
	)

	const isCorrect = useMemo(
		() => Object.values(attempts).includes(true),
		[attempts],
	)

	const helperText = useMemo<IHelperText>(() => {
		if (isZeroAttempts) {
			return {
				text: 'Выбирайте с умом!',
				style: `text-gray-500 font-bold`,
			}
		}

		return match(isCorrect)
			.with(true, () => ({
				text: 'Отлично, правильный ответ!',
				style: 'text-green-500 font-bold',
			}))
			.otherwise(() => ({
				text: 'Неверный ответ!',
				style: 'text-red-500 font-bold',
			}))
	}, [isCorrect, isZeroAttempts])

	function checkAnswer(): void {
		if (selected === null) return

		setAttempts((attempts) => ({
			...attempts,
			[selected.id]: selected.id === correctAnswer,
		}))
	}

	function getAnswerStyles(answer: IAnswer): IFormControlStyles {
		if (!Object.hasOwn(attempts, answer.id)) {
			return defaultAnswerStyles
		}

		return attempts[answer.id] ? correctAnswerStyles : wrongAnswerStyles
	}

	return (
		<>
			<h3 className="m-0 p-3">{currentQuestion?.text}</h3>

			<Divider className="mx-2" />

			<form>
				<FormControl className="w-full p-3" variant="standard">
					<RadioGroup>
						{currentQuestion?.answers.map((answer) => (
							<AnswerItemMemo
								key={answer.id}
								answer={answer}
								isCorrect={isCorrect}
								getAnswerStyles={getAnswerStyles}
								setSelected={setSelected}
							/>
						))}
					</RadioGroup>

					<FormHelperText
						className={`text-center text-base ${helperText.style}`}
					>
						{helperText.text}
					</FormHelperText>
					<div className="flex justify-between">
						<p className="text-sm font-semibold pl-5 text-gray-400">
							вопрос 1 из 10
						</p>
						<Button
							className="w-40 h-10 my-auto text"
							size="small"
							variant="contained"
							onClick={checkAnswer}
							disabled={selected === null}
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
