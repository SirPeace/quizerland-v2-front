'use client'

import { DevTool } from '@hookform/devtools'

import { zodResolver } from '@hookform/resolvers/zod'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Box, Button, Card, TextField, Radio, RadioGroup } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { debounce } from 'lodash-es'
import { useContext, useEffect } from 'react'

import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { useAppSelector } from '@/redux/reduxHooks'

import CreateQuizContext from '../context'

import { type TQuestionForm, questionFormSchema } from '../schema'

const QuizQuestionForm = (): JSX.Element => {
  const { activeTab: questionIndex } = useContext(CreateQuizContext)

  const { question } = useAppSelector(({ quizFormState }) => {
    const question = quizFormState.questions[questionIndex]

    return { question }
  })

  const { control, formState, reset } = useForm<TQuestionForm>({
    resolver: zodResolver(questionFormSchema),
  })
  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    name: 'answers',
    control,
  })

  useEffect(() => {
    if (undefined !== question) {
      reset({
        title: question.title,
        rightAnswerId: question.rightAnswerId,
        answers: question.answers,
      })
    }
  }, [question, reset])

  function addAnswer(): void {
    appendAnswer({ text: '' })
  }
  function deleteAnswer(answerIndex: number): void {
    removeAnswer(answerIndex)
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
            <RadioGroup {...field} className="space-y-4">
              {answerFields.map((answerField, idx) => (
                <div key={answerField.id} className="flex w-full">
                  <Radio value={idx} className="mr-1" />

                  <Controller
                    control={control}
                    name={`answers.${idx}.text`}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
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
