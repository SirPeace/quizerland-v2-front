import { createContext } from 'react'

import type { TQuizForm } from './types'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'

export interface ICreateQuizContext {
  /** `[-1] => описание теста | [>= 0] => индекс вопроса` */
  activeTab: number
  setActiveTab: Dispatch<SetStateAction<number>>
  form: UseFormReturn<TQuizForm> | Record<string, never>
  submit: () => void
}
const CreateQuizContext = createContext<ICreateQuizContext>({
  activeTab: 0,
  setActiveTab: () => {},
  form: {},
  submit: () => {},
})

export default CreateQuizContext
