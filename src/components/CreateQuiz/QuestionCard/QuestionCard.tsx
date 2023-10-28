'use client'

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Box, Button, Card, TextField, Radio } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { debounce } from 'lodash-es'
import { useCallback, useContext, useState } from 'react'
import { type FieldErrors, useWatch } from 'react-hook-form'

import { defaultQuestion } from '../QuizForm'
import CreateQuizContext from '../context'

import type {
  AnswerKey,
  QuestionKey,
  TQuestionSchema,
  TQuizForm,
} from '../types'

const QuizQuestionForm = (): JSX.Element => {
  const {
    activeTab: questionIndex,
    setActiveTab,
    form,
  } = useContext(CreateQuizContext)

  console.log(`Question index: ${questionIndex}`)

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    resetField,
  } = form

  /*
    Замена useAppSelector
    Получаем данные не из Redux, а из стейта RHF
  */
  const questions = getValues('questions')
  const question = getValues(`questions.${questionIndex}`)

  console.log(question)

  // useWatch() вместо getValues(), т.к. нам надо следить за списком ответов и ре-рендерить список, когда добавляем/удаляем элементы
  const answers = useWatch({
    control: form.control,
    name: `questions.${questionIndex}.answers`,
  })

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  /*
    Используем useCallback, чтобы объявить функции только в момент инициализации компонента.
    При последующих ре-рендерах будут использоваться те же самые экземпляры функции
  */
  const questionFieldError = useCallback(
    (field: keyof TQuestionSchema) =>
      getQuestionFieldError(errors, questionIndex, field),
    [errors, questionIndex],
  )
  const answerFieldError = useCallback(
    (answerIndex: number) =>
      getQuestionAnswerFieldError(errors, questionIndex, answerIndex),
    [errors, questionIndex],
  )

  const questionFieldKey = useCallback(
    (field: keyof TQuestionSchema): QuestionKey =>
      `questions.${questionIndex}.${field}`,
    [questionIndex],
  )
  const answerFieldKey = useCallback(
    (index: number): AnswerKey => `questions.${questionIndex}.answers.${index}`,
    [questionIndex],
  )

  /*
    setValue() - программно обновляем состояние RHF, чтобы добавить/убрать элементы в списке
  */
  function addAnswer(): void {
    setValue(`questions.${questionIndex}.answers`, [...question.answers, ''])
  }
  function deleteAnswer(answerIndex: number): void {
    setValue(
      `questions.${questionIndex}.answers`,
      question.answers.filter((_, idx) => idx !== answerIndex),
    )
  }

  function addQuestion(): void {
    const newActiveTab = questions.length

    setValue('questions', [...questions, defaultQuestion])
    setActiveTab(newActiveTab)
    console.log(questions)
  }

  return (
    <Card raised className="py-5 px-5 rounded-xl mx-3">
      <Box component="form">
        <TextField
          {...register(questionFieldKey('text'))}
          label="Добавьте текст вопроса"
          type="text"
          placeholder="Пример: Первый астронавт вышедший в открытый космос?"
          fullWidth
          multiline
          error={errors.questions?.[questionIndex]?.text !== undefined}
        />
        <p className="mt-0.5 pl-3 text-xs text-red-600 h-4">
          {questionFieldError('text')}
        </p>

        {answers.map((answer, idx) => (
          <div key={idx}>
            <div className="flex w-full">
              <Radio
                {...register(questionFieldKey('rightAnswerId'))}
                className="mr-1 mt-[-1px]"
                value={idx}
                checked={idx === selectedAnswer}
                onClick={() => {
                  setSelectedAnswer(idx)
                }}
              />

              <TextField
                {...register(answerFieldKey(idx))}
                // Переопределяем метод onChange, который возвращает функция register(), чтобы обернуть её в debounce
                onChange={debounce(register(answerFieldKey(idx)).onChange, 500)}
                type="text"
                placeholder="Введите вариант ответа..."
                multiline
                fullWidth
                size="small"
                error={Boolean(answerFieldError(idx))}
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
            </div>

            <p className="mt-[-1px] mb-2 pl-12 text-xs text-red-600  h-4">
              {answerFieldError(idx)}
            </p>
          </div>
        ))}

        <Button
          variant="text"
          type="button"
          fullWidth
          size="large"
          startIcon={<AddToPhotosIcon />}
          onClick={addAnswer}
        >
          Добавить ответ
        </Button>

        <Button
          variant="text"
          type="button"
          fullWidth
          size="large"
          startIcon={<AddToPhotosIcon />}
          onClick={addQuestion}
        >
          Добавить вопрос
        </Button>

        {questionFieldError('rightAnswerId') !== '' && (
          <p className="mt-4 text-red-600 text-base text-center font-bold">
            {questionFieldError('rightAnswerId')}
          </p>
        )}
      </Box>
    </Card>
  )
}

export default QuizQuestionForm

function getQuestionFieldError(
  errors: FieldErrors<TQuizForm>,
  questionIndex: number,
  field: keyof TQuestionSchema,
): string | undefined {
  return errors.questions?.[questionIndex]?.[field] !== undefined
    ? errors.questions[questionIndex]?.[field]?.message
    : ''
}

function getQuestionAnswerFieldError(
  errors: FieldErrors<TQuizForm>,
  questionIndex: number,
  answerIndex: number,
): string | undefined {
  return errors.questions?.[questionIndex]?.answers?.[answerIndex] !== undefined
    ? errors.questions[questionIndex]?.answers?.[answerIndex]?.message
    : ''
}
