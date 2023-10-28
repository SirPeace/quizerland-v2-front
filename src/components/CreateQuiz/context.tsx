import { createContext } from 'react'

import type { Dispatch, SetStateAction } from 'react'

export interface ICreateQuizContext {
  /** `[-1] => описание теста | [>= 0] => индекс вопроса` */
  activeTab: number
  setActiveTab: Dispatch<SetStateAction<number>>
  submit: () => void
}
const CreateQuizContext = createContext<ICreateQuizContext>({
  activeTab: 0,
  setActiveTab: () => {},
  submit: () => {},
})

export default CreateQuizContext

// https://stackoverflow.com/questions/70394537/how-to-set-array-in-useform-and-validate-the-length-of-value
