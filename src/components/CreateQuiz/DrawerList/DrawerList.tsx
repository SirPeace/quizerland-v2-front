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

import { useContext, useMemo } from 'react'

import { useWatch } from 'react-hook-form'

import { defaultQuestion } from '../QuizForm'
import CreateQuizContext from '../context'

const DrawerList = (): JSX.Element => {
  const { activeTab, submit, setActiveTab, form } =
    useContext(CreateQuizContext)

  const { setValue } = form

  // useWatch() вместо getValues(), т.к. нам надо следить за добавлением новых вопросов и ре-рендерить список при изменениях
  const questions = useWatch({
    control: form.control,
    name: 'questions',
  })

  function addQuestion(): void {
    console.debug(questions)

    const newActiveTab = questions.length

    setValue('questions', [...questions, defaultQuestion])
    setActiveTab(questions.length + 1)
    console.log(questions)
  }

  const setActiveTabLog = (index: number): void => {
    setActiveTab(index)
    console.log('activeTab :', activeTab)
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
          <ListItemText
            primary={
              questions.length <= 1 ? 'Вопросы не добавлены' : 'Список вопросов'
            }
            className="text-center"
          />
          {questions.map((question, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton
                onClick={() => {
                  setActiveTabLog(idx)
                }}
              >
                <ListItemText>
                  {`№ ${idx}: "${questions.length > 0 && question.text}"`}
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
