import { Radio, TextField } from '@mui/material'

import type { IAnswerTemplate } from '@/redux/createQuiz/types'

import type { Dispatch, SetStateAction } from 'react'

interface QuizQuestionFormProps {
  answer: IAnswerTemplate
  selected: number | null
  setSelected: Dispatch<SetStateAction<number | null>>
}

export const AnswerForm = ({
  answer,
  selected,
  setSelected,
}: QuizQuestionFormProps): JSX.Element => {
  const one = 1
  return (
    <div key={answer.id} className="flex w-full">
      <Radio
        className="mt-3 mr-2"
        checked={answer.id === selected}
        onClick={() => {
          setSelected(answer.id)
        }}
      />

      <TextField
        type="text"
        variant="standard"
        label={answer.label}
        multiline
        fullWidth
        className="mr-3"
      />
    </div>
  )
}

export default AnswerForm
