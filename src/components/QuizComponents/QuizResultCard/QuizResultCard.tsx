'use client'

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'

import { Divider } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

import { goToAvailableQuiz, setCurrentQuestion } from '@/redux/quiz/quizSlice'
import { useAppDispatch } from '@/redux/reduxHooks'

const QuizResultCard = (): JSX.Element => {
	const dispatch = useAppDispatch()

	return (
		<Card className="rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
			<CardContent sx={{ pb: 0 }}>
				<Typography gutterBottom variant="h6" component="div">
					Результат теста
				</Typography>
				<Divider />

				<RadioGroup className="mx-4 my-4">
					<FormControlLabel
						control={
							<HighlightOffOutlinedIcon
								className="text-red-400"
								sx={{ margin: '9px' }}
							/>
						}
						className="text-red-400"
						label="Неверные ответы :"
					/>
					<div className="h-2" />
					<FormControlLabel
						control={
							<VerifiedOutlinedIcon
								className="text-green-700"
								sx={{ margin: '9px' }}
							/>
						}
						className="text-green-600"
						label="Правильные ответы :"
					/>
				</RadioGroup>
			</CardContent>
			<CardActions className="mx-3">
				<Button
					size="small"
					className="mr-3"
					onClick={() => dispatch(setCurrentQuestion(1))}
				>
					Повторить
				</Button>
				<Button size="small" onClick={() => dispatch(goToAvailableQuiz())}>
					К следующему тесту
				</Button>
			</CardActions>
		</Card>
	)
}
export default QuizResultCard
