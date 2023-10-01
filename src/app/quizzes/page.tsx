'use client'

import { Divider } from '@mui/material'
import Button from '@mui/material/Button'
import { Neucha, Pacifico } from 'next/font/google'

import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/redux/reduxHooks'

const neucha = Neucha({ subsets: ['cyrillic'], weight: '400', preload: true })
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', preload: true })

const QuizzesPage = (): JSX.Element => {
	const quizzes = useAppSelector(({ quizState }) => quizState.quizzes)
	const router = useRouter()

	return (
		<div className="max-w-4xl min-h-screen mx-auto pb-1 text-center ">
			<h1 className="pt-16 pb-6 my-0 sty sticky top-0 bg-white z-10">
				<span className={`sm:text-3xl text-2xl ${neucha.className}`}>
					Добро пожаловать в{' '}
				</span>
				<span className={`sm:text-4xl text-3xl ${pacifico.className}`}>
					Quizerland
				</span>
			</h1>

			{quizzes.map((quiz, idx) => (
				<div
					key={`${idx}-${quiz.title}`}
					className="bg-white my-4 mx-6 rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]"
				>
					<div className="flex justify-between p-3">
						<h4 className="m-0">{quiz.title}</h4>
						<p className="text-sm antialiased font-semibold m-0 text-gray-400 ">
							тест № {quiz.id}
						</p>
					</div>

					<Divider className="mx-2" />
					<p className="px-4 text-justify line-clamp-3 hover:line-clamp-none indent-4 text-sky-600">
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
								router.push(`quizzes/quiz-${quiz.id}`)
							}}
						>
							перейти к тесту
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}

export default QuizzesPage
