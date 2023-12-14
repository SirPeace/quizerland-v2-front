'use client'

import { Divider, FormControlLabel, Paper } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import RadioGroup from '@mui/material/RadioGroup'

import { useMemo, useState } from 'react'

import { match } from 'ts-pattern'

import { updateQuizProgress } from '@/api/modules/quizzes'
import { goToNextQuestion, setRightAttempts } from '@/redux/quiz/quizSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

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
  questionIndex,
  questionsLength,
}: IQuestionCardProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const { id: quizId } = useAppSelector(({ quizState }) => quizState)

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>()
  const [attempts, setAttempts] = useState<Record<number, boolean>>({})

  const correctAnswer = useMemo(() => question.correctAnswerIndex, [question])
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

  const getStylesForAnswer = (answerIndex: number): IFormControlStyles => {
    const isSelected = selectedAnswerIndex === answerIndex
    const isAttempted = Object.hasOwn(attempts, answerIndex)
    const isCorrect = attempts[answerIndex]

    return match<boolean>(true)
      .with(!isSelected && !isAttempted, () => defaultAnswerStyles)
      .with(isSelected && !isAttempted, () => checkedAnswerStyles)
      .with(isCorrect, () => correctAnswerStyles)
      .otherwise(() => wrongAnswerStyles)
  }

  async function checkAnswer(): Promise<void> {
    if (selectedAnswerIndex === undefined) return

    const isCorrectAnswer = selectedAnswerIndex === correctAnswer

    setAttempts(attempts => ({
      ...attempts,
      [selectedAnswerIndex]: isCorrectAnswer,
    }))

    if (isCorrectAnswer) {
      const hadWrongAttempts = Object.values(attempts).includes(false)
      if (!hadWrongAttempts) {
        dispatch(setRightAttempts())
      }

      const updateProgress = async (): Promise<void> => {
        try {
          await updateQuizProgress(quizId, !hadWrongAttempts)
        } catch (err: any) {
          setTimeout(updateProgress, 5000)
        }
      }
      void updateProgress()

      setTimeout(() => {
        setSelectedAnswerIndex(undefined)
        setAttempts({})
        dispatch(goToNextQuestion())
      }, 2000)
    }
  }

  return (
    <Paper elevation={8} className="rounded-xl">
      <h3 className="m-0 p-3">{question.text}</h3>

      <Divider className="mx-2" />

      <form>
        <FormControl className="w-full p-3" variant="standard">
          <RadioGroup>
            {question.answers.map((answer, idx) => (
              <Button
                key={idx}
                className="normal-case disabled:opacity-60"
                disabled={
                  isSelectedAnswerCorrect || Object.hasOwn(attempts, idx)
                }
              >
                <FormControlLabel
                  value={idx}
                  control={getStylesForAnswer(idx).icon}
                  label={answer.text}
                  className={`w-full m-0 ${getStylesForAnswer(idx).text}`}
                  onClick={() => {
                    setSelectedAnswerIndex(idx)
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
              вопрос {questionIndex + 1} из {questionsLength}
            </p>
            <Button
              className="w-40 h-10 my-auto text"
              size="small"
              variant="contained"
              disabled={isSelectedAnswerCorrect}
              onClick={checkAnswer}
            >
              Проверить ответ
            </Button>
          </div>
        </FormControl>
      </form>
    </Paper>
  )
}
export default QuestionCard
