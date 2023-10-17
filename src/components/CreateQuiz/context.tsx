import { createContext } from 'react'

import type { Dispatch, SetStateAction } from 'react'

interface ICreateQuizContext {
  /** `0 => описание теста | >0 => id вопроса` */
  activeTab: number
  setActiveTab: Dispatch<SetStateAction<number>>
}
const CreateQuizContext = createContext<ICreateQuizContext>({
  activeTab: 0,
  setActiveTab: () => {},
})

export default CreateQuizContext
