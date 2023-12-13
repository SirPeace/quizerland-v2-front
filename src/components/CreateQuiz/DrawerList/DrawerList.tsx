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

import { QuizFormContext } from '../QuizFormContext'

const DrawerList = (): JSX.Element => {
  const { submit, activeTab, setActiveTab } = useContext(QuizFormContext)

  const { questions } = useAppSelector(({ quizFormState }) => quizFormState)
  const dispatch = useAppDispatch()

  function addQuestion(): void {
    const newActiveTab = questions.length

    dispatch(addQuestionAction())
    setActiveTab(newActiveTab)
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
              selected={activeTab === -1}
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
        </List>
        <Divider className="mx-3" />
        <div className="my-4 px-2">
          <Button
            variant="contained"
            color="secondary"
            className="w-full"
            onClick={() => {
              addQuestion()
            }}
          >
            <AddToPhotosIcon fontSize={'small'} className="mr-4" />
            Новый вопрос
          </Button>
        </div>
        <List className="py-0">
          {questions.map((question, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton
                selected={idx === activeTab}
                onClick={() => {
                  setActiveTab(idx)
                }}
              >
                <ListItemText>{`${idx + 1}. ${question.title}`}</ListItemText>
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
