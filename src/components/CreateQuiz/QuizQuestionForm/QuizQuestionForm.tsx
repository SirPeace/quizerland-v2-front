'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Box, Button, Card, TextField, Radio } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { useContext, useState } from 'react'

import { useForm } from 'react-hook-form'

import {
  addNewAnswer,
  addNewQuestion,
  deleteAnswer,
} from '@/redux/createQuiz/createQuizSlice'
import type {
  IAnswerTemplate,
  IQuestionTemplate,
} from '@/redux/createQuiz/types'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import CreateQuizContext from '../context'
import { questionSchema, type TQuestionSchema } from '../types'

// import AnswerForm from './AnswerForm/AnswerForm'

import type { SubmitHandler } from 'react-hook-form'

const QuizQuestionForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TQuestionSchema>({
    resolver: zodResolver(questionSchema),
  })

  const [selected, setSelected] = useState<number | undefined>(undefined)

  const dispatch = useAppDispatch()

  const { activeTab } = useContext(CreateQuizContext)

  const activeQuestion = useAppSelector(({ createQuizState }) =>
    createQuizState.questions.find(q => q.id === activeTab),
  )
  const { questions } = useAppSelector(({ createQuizState }) => createQuizState)
  const answers = activeQuestion?.answers

  const lastAnswerId = Number(answers?.at(-1)?.id)
  const lastQuestionId = Number(questions?.at(-1)?.id)

  const buildingNewAnswers = (
    submitDataAnswers: string[],
  ): IAnswerTemplate[] => {
    const newAnswers = []

    for (let i = 0; i < submitDataAnswers.length; i++) {
      const answerObj: IAnswerTemplate = {
        id: i + 1,
        text: submitDataAnswers[i],
      }
      newAnswers.push(answerObj)
    }

    return newAnswers
  }

  const buildingNewQuestion = (submitData: {
    question: string
    answers: string[]
  }): IQuestionTemplate => {
    const newQuestion: IQuestionTemplate = {
      id: lastQuestionId + 1,
      text: submitData.question,
      correctAnswerId: selected,
      answers: buildingNewAnswers(submitData.answers),
    }
    return newQuestion
  }

  const onSubmit: SubmitHandler<TQuestionSchema> = async (
    data,
  ): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('onSubmit (data) :', data)

    dispatch(addNewQuestion(buildingNewQuestion(data)))

    reset()
  }

  return (
    <Card raised className="py-5 px-5 rounded-xl mx-3">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                // {...register('setRightAnswer')}
                className="mr-1 mt-[-1px]"
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

        {/* <p className="mt-[-1px] mb-2 pl-3 text-xs text-red-600  h-4">
          {errors.setRightAnswer !== undefined
            ? errors.setRightAnswer?.message
            : ''}
        </p> */}

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
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Сохранить вопрос
          </Button>
        </div>
      </Box>
    </Card>
  )
}

export default QuizQuestionForm
