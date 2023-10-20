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
} from '@mui/material'

import { useContext } from 'react'

import { useAppSelector } from '@/redux/reduxHooks'

import CreateQuizContext from '../context'

const DrawerList = (): JSX.Element => {
  const questions = useAppSelector(
    ({ createQuizState }) => createQuizState.questions,
  )

  const { activeTab, setActiveTab } = useContext(CreateQuizContext)
  console.log(activeTab)

  return (
    <Box sx={{ mt: { sm: 10, xs: 0 } }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setActiveTab(0)
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
              setActiveTab(1)
            }}
          >
            <ListItemIcon>
              <AddToPhotosIcon />
            </ListItemIcon>
            <ListItemText primary={'Добавить ответ'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider className="mx-3" />
      <List>
        {questions.length === 1 ? (
          <ListItemText
            primary={'Вопросы не добавлены'}
            className="text-center"
          />
        ) : (
          questions.map((question, idx) => (
            <ListItem key={question.id} disablePadding>
              {idx > 0 && (
                <ListItemButton
                  onClick={() => {
                    setActiveTab(question.id)
                  }}
                >
                  <ListItemText primary={`№ ${idx}: ${question.text}`} />
                </ListItemButton>
              )}
            </ListItem>
          ))
        )}
      </List>
    </Box>
  )
}

export default DrawerList
