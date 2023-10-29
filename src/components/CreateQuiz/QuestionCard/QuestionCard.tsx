'use client'

import { DevTool } from '@hookform/devtools'

import { zodResolver } from '@hookform/resolvers/zod'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Box, Button, Card, TextField, Radio, RadioGroup } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { type DebouncedFunc, debounce } from 'lodash-es'
import { type ChangeEvent, useContext, useEffect } from 'react'

import { Controller, useFieldArray, useForm } from 'react-hook-form'

import {
  appendAnswer,
  removeAnswer,
  updateAnswer,
  updateQuestion,
} from '@/redux/quizForm/quizFormSlice'
import type { IQuestionForm } from '@/redux/quizForm/types'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import CreateQuizContext from '../context'

import { type TQuestionForm, questionFormSchema } from '../schema'

type TOnAnswerInputDebounced = DebouncedFunc<
  (event: ChangeEvent<HTMLInputElement>, answerIndex: number) => void
>

/**
 * Ключ = индекс ответа\
 * Значение = результат вызова debounce() на ф-ции onAnswerInput()
 */
const _answerInputDebounceCache: Record<number, TOnAnswerInputDebounced> = {}

const QuizQuestionForm = (): JSX.Element => {
  //* =======================================
  //*             STATE & HOOKS
  //* =======================================

  const { activeTab: questionIndex } = useContext(CreateQuizContext)

  const { question } = useAppSelector(({ quizFormState }) => {
    const question = quizFormState.questions[questionIndex]

    return { question }
  })
  const dispatch = useAppDispatch()

  const { control, formState, reset } = useForm<TQuestionForm>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: question?.title ?? '',
      rightAnswerId: question?.rightAnswerId ?? 0,
      answers: [{ text: '' }, { text: '' }, { text: '' }],
    },
  })
  const {
    fields: answerFields,
    append: appendFormAnswer,
    remove: removeFormAnswer,
  } = useFieldArray({
    name: 'answers',
    control,
  })

  //* =======================================
  //*               useEffect
  //* =======================================

  useEffect(() => {
    if (undefined !== question) {
      reset({
        title: question.title,
        rightAnswerId: question.rightAnswerId ?? 0,
        answers: question.answers,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex])

  //* =======================================
  //*                METHODS
  //* =======================================

  function onInput(
    event: ChangeEvent<HTMLInputElement>,
    field: keyof IQuestionForm,
  ): void {
    dispatch(
      updateQuestion({
        index: questionIndex,
        question: {
          [field]: event.target.value,
        },
      }),
    )
  }
  const onInputDebounce = debounce(onInput, 500)

  function onAnswerInput(
    event: ChangeEvent<HTMLInputElement>,
    answerIndex: number,
  ): void {
    dispatch(
      updateAnswer({
        questionIndex,
        answerIndex,
        answer: {
          text: event.target.value,
        },
      }),
    )
  }
  const onAnswerInputDebounce = (
    answerIndex: number,
  ): TOnAnswerInputDebounced => {
    if (undefined === _answerInputDebounceCache[answerIndex]) {
      _answerInputDebounceCache[answerIndex] = debounce(e => {
        onAnswerInput(e, answerIndex)
      }, 500)
    }

    return _answerInputDebounceCache[answerIndex]
  }

  function addAnswer(): void {
    appendFormAnswer({ text: '' })
    dispatch(appendAnswer({ questionIndex }))
  }
  function deleteAnswer(answerIndex: number): void {
    removeFormAnswer(answerIndex)
    dispatch(removeAnswer({ questionIndex, answerIndex }))
  }

  return (
    <Card raised className="py-5 px-5 rounded-xl mx-3">
      <DevTool control={control} placement="top-right" />
      <Box component="form">
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                onInputDebounce(e, 'title')
              }
              label="Добавьте текст вопроса"
              type="text"
              placeholder="Пример: Первый астронавт вышедший в открытый космос?"
              fullWidth
              multiline
              className="mb-6"
              error={undefined !== error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="rightAnswerId"
          render={({ field }) => (
            <RadioGroup
              {...field}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                onInput(e, 'rightAnswerId')
              }}
              className="space-y-4"
            >
              {answerFields.map((answerField, idx) => (
                <div key={answerField.id} className="flex w-full">
                  <Radio value={idx} className="mr-1" />

                  <Controller
                    control={control}
                    name={`answers.${idx}.text`}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        onInput={(e: ChangeEvent<HTMLInputElement>) => {
                          e.stopPropagation()
                          onAnswerInputDebounce(idx)(e, idx)
                        }}
                        placeholder="Введите вариант ответа..."
                        multiline
                        fullWidth
                        size="small"
                        error={undefined !== error}
                        helperText={error?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  deleteAnswer(idx)
                                }}
                                edge="end"
                              >
                                {<DeleteForeverIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
              ))}
            </RadioGroup>
          )}
        />

        <Button
          variant="text"
          type="button"
          fullWidth
          size="large"
          startIcon={<AddToPhotosIcon />}
          className="mt-2"
          onClick={addAnswer}
        >
          Добавить ответ
        </Button>

        {undefined !== formState.errors.rightAnswerId && (
          <p className="mt-4 text-red-600 text-base text-center font-bold">
            {formState.errors.rightAnswerId?.message}
          </p>
        )}
      </Box>
    </Card>
  )
}

export default QuizQuestionForm
