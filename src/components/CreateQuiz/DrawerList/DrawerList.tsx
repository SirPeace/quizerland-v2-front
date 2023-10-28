import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import DescriptionIcon from '@mui/icons-material/Description'

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material'

import { useContext } from 'react'

import { addQuestion as addQuestionAction } from '@/redux/quizForm/quizFormSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import CreateQuizContext from '../context'

const DrawerList = (): JSX.Element => {
  const { submit, setActiveTab } = useContext(CreateQuizContext)

  const { questions } = useAppSelector(({ quizFormState }) => quizFormState)
  const dispatch = useAppDispatch()

  function addQuestion(): void {
    const newActiveTab = questions.length

    dispatch(addQuestionAction())
    setActiveTab(questions.length + 1)
  }

  return (
    <Box
      sx={{ mt: { sm: 10, xs: 0 } }}
      className="flex flex-col justify-between h-full"
    >
      <div>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveTab(-1)
              }}
            >
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={'Описание теста'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                addQuestion()
              }}
            >
              <ListItemIcon>
                <AddToPhotosIcon />
              </ListItemIcon>
              <ListItemText primary={'Новый вопрос'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider className="mx-3" />
        <List>
          {questions.map((question, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton
                onClick={() => {
                  setActiveTab(idx)
                }}
              >
                <ListItemText>
                  {`№ ${idx + 1}: "${question.title}"`}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>

      <Button variant="contained" onClick={submit} className="m-2">
        Создать тест
      </Button>
    </Box>
  )
}

export default DrawerList
