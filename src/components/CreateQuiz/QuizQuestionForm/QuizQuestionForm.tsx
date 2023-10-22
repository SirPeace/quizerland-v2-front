'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Box, Button, Card, TextField, Radio } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { debounce } from 'lodash-es'
import { useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import {
  addNewAnswer,
  deleteAnswer,
  setQuestion,
} from '@/redux/createQuiz/createQuizSlice'
import type {
  IAnswerTemplate,
  IQuestionTemplate,
} from '@/redux/createQuiz/types'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import CreateQuizContext from '../context'
import { questionSchema, type TQuestionSchema } from '../types'

const QuizQuestionForm = (): JSX.Element => {
  const { activeTab } = useContext(CreateQuizContext)

  const [selected, setSelected] = useState<number | null>(null)

  const dispatch = useAppDispatch()

  const activeQuestion = useAppSelector(({ createQuizState }) =>
    createQuizState.questions.find(q => q.id === activeTab),
  )
  if (undefined === activeQuestion) return <></>

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<TQuestionSchema>({
    mode: 'onChange',
    defaultValues: {
      question: activeQuestion.text,
      rightAnswerId: String(activeQuestion.correctAnswerId),
      answers: activeQuestion.answers.map(answer => answer.text),
    },

    resolver: zodResolver(questionSchema),
  })

  const answers = activeQuestion.answers

  const lastAnswerId = Number(answers?.at(-1)?.id)

  const stringsToAnswers = (answers: string[]): IAnswerTemplate[] => {
    const answerTemplates = []

    for (let i = 0; i < answers.length; i++) {
      const answerObj: IAnswerTemplate = {
        id: i + 1,
        text: answers[i],
      }
      answerTemplates.push(answerObj)
    }

    return answerTemplates
  }

  useEffect(() => {
    const updateQuestion = (data: TQuestionSchema): void => {
      const newQuestion: IQuestionTemplate = {
        id: activeTab,
        text: data.question,
        correctAnswerId: Number(data.rightAnswerId),
        answers: stringsToAnswers(data.answers),
      }
      dispatch(setQuestion(newQuestion))
    }

    // TODO: Разобраться с типом value
    // TODO: Оставить debounce только для текстовых полей
    const subscription = watch(
      debounce(value => {
        updateQuestion(value)
      }, 500),
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [watch, activeTab, dispatch, selected])

  return (
    <Card raised className="py-5 px-5 rounded-xl mx-3">
      <Box component="form">
        <TextField
          {...register('question')}
          label="Добавьте текст вопроса"
          type="text"
          placeholder="Пример: Первый астронавт вышедший в открытый космос?"
          fullWidth
          multiline
          focused
          error={errors.question !== undefined}
        />
        <p className="mt-0.5 pl-3 text-xs text-red-600 h-4">
          {errors.question !== undefined ? errors.question.message : ''}
        </p>

        {answers?.map((answer, i) => (
          <div key={answer.id}>
            <div className="flex w-full">
              <Radio
                {...register('rightAnswerId')}
                className="mr-1 mt-[-1px]"
                value={answer.id}
                checked={answer.id === selected}
                onClick={() => {
                  setSelected(answer.id)
                }}
              />

              <TextField
                {...register(`answers.${i}`)}
                type="text"
                placeholder="Введите вариант ответа..."
                multiline
                fullWidth
                size="small"
                error={errors.answers?.[i] !== undefined}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => dispatch(deleteAnswer(answer.id))}
                        edge="end"
                      >
                        {<DeleteForeverIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <p className="mt-[-1px] mb-2 pl-12 text-xs text-red-600  h-4">
              {errors.answers?.[i] !== undefined
                ? errors.answers?.[i]?.message
                : ''}
            </p>
          </div>
        ))}

        <p className="mt-[-1px] mb-2 pl-3 text-xs text-red-600  h-4">
          {errors.rightAnswerId !== undefined
            ? errors.rightAnswerId?.message
            : ''}
        </p>

        <div className="flex justify-between mt-6">
          <Button
            variant="text"
            type="button"
            startIcon={<AddToPhotosIcon />}
            onClick={() =>
              dispatch(addNewAnswer({ id: lastAnswerId + 1, text: '' }))
            }
          >
            Добавить ответ
          </Button>
          <Button variant="contained" type="submit">
            Сохранить вопрос
          </Button>
        </div>
      </Box>
    </Card>
  )
}

export default QuizQuestionForm
