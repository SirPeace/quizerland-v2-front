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

import { useWatch } from 'react-hook-form'

import CreateQuizContext from '../context'

const DrawerList = (): JSX.Element => {
  const { submit, setActiveTab, form } = useContext(CreateQuizContext)

  // useWatch() вместо getValues(), т.к. нам надо следить за добавлением новых вопросов и ре-рендерить список при изменениях
  const questions = useWatch({
    control: form.control,
    name: 'questions',
  })

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
        </List>
        <Divider className="mx-3" />
        <div className="p-2">
          <Button
            variant="contained"
            startIcon={<AddToPhotosIcon />}
            fullWidth
            onClick={() => {
              setActiveTab(0)
            }}
            className="bg-purple-500"
          >
            Новый вопрос
          </Button>
        </div>

        <List>
          {questions.length === 0 ? (
            <ListItemText
              primary={'Вопросы не добавлены'}
              className="text-center"
            />
          ) : (
            questions.map((question, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActiveTab(idx)
                  }}
                >
                  <ListItemText
                    primary={`№ ${idx + 1}: "${
                      question.text.length > 0 ? question.text : '___'
                    }"`}
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </div>

      <Button variant="contained" onClick={submit} className="m-2">
        Создать тест
      </Button>
    </Box>
  )
}

export default DrawerList
