import { Divider } from '@mui/material'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

import type { IQuiz } from '@/redux/quiz/types'

interface IQuizProp {
	quiz: IQuiz
}
const Quiz = ({ quiz }: IQuizProp): JSX.Element => {
	const router = useRouter()

	return (
		<div className="bg-white my-4 mx-6 rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
			<div className="flex justify-between p-3">
				<h4 className="m-0">{quiz.title}</h4>
				<p className="text-sm antialiased font-semibold m-0 text-gray-400">
					тест № {quiz.id}
				</p>
			</div>

			<Divider className="mx-2" />
			<p className="px-4 text-justify line-clamp-3 indent-4 text-sky-600 ">
				{quiz.description}
			</p>

			<div className="flex justify-between px-4">
				<p className="text-sm font-semibold text-gray-400 ">
					тест из {quiz.questions.length} вопросов
				</p>
				<Button
					className="mb-4 opacity-80"
					color="primary"
					variant="contained"
					size="small"
					onClick={() => {
						router.push(`/quizzes/${quiz.id}`)
					}}
				>
					перейти к тесту
				</Button>
			</div>
		</div>
	)
}

export default Quiz
