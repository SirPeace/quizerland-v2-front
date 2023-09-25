import { Divider } from '@mui/material'
import Button from '@mui/material/Button'
import { Neucha, Pacifico } from 'next/font/google'

const neucha = Neucha({ subsets: ['cyrillic'], weight: '400' })
const pacifico = Pacifico({ subsets: ['latin'], weight: '400' })

const QuizzesPage = (): JSX.Element => (
	<div className="max-w-4xl min-h-screen mx-auto pb-1">
		<h1 className=" pt-16 pb-6 my-0 sty sticky top-0 bg-orange-200 z-10">
			<span className={`sm:text-3xl text-2xl ${neucha.className}`}>
				Добро пожаловать в
			</span>
			<span className={`sm:text-4xl text-3xl ${pacifico.className}`}>
				{' '}
				Quizerland
			</span>
		</h1>

		<div className="bg-white my-4 mx-6 rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
			<h4 className="text-left m-0 p-3">Тест по истории</h4>
			<Divider className="mx-2" />
			<p className="px-4 text-justify indent-4 text-sky-600">
				<span className="font-bold">История</span> – это и особая отрасль
				знания, наука, изучающая развитие человеческого общества в прошлом.
				Главная ее цель – с помощью знаний о прошлом способствовать пониманию
				настоящего и прогнозировать будущее.
			</p>

			<div className="flex justify-between px-4">
				<p className="text-sm antialiased font-semibold text-gray-400 ">
					тест из 20 вопросов
				</p>
				<Button
					className="mb-4 opacity-80"
					color="primary"
					variant="contained"
					size="small"
				>
					перейти к тесту
				</Button>
			</div>
		</div>

		<div className="bg-white my-4 mx-6 rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
			<h4 className="text-left m-0 p-3">Тест по истории</h4>
			<Divider className="mx-2" />
			<p className="px-4 text-justify text-sky-600">
				История – это и особая отрасль знания, наука, изучающая развитие
				человеческого общества в прошлом. Главная ее цель – с помощью знаний о
				прошлом способствовать пониманию настоящего и прогнозировать будущее.
			</p>

			<div className="flex justify-between px-4">
				<p className="text-sm antialiased font-semibold text-gray-400 ">
					тест из 20 вопросов
				</p>
				<Button
					className="mb-4 opacity-80"
					color="primary"
					variant="contained"
					size="small"
				>
					перейти к тесту
				</Button>
			</div>
		</div>

		<div className="bg-white my-4 mx-6 rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
			<h4 className="text-left m-0 p-3">Тест по истории</h4>
			<Divider className="mx-2" />
			<p className="px-4 text-justify text-sky-600">
				История – это и особая отрасль знания, наука, изучающая развитие
				человеческого общества в прошлом. Главная ее цель – с помощью знаний о
				прошлом способствовать пониманию настоящего и прогнозировать будущее.
			</p>

			<div className="flex justify-between px-4">
				<p className="text-sm antialiased font-semibold text-gray-400 ">
					тест из 20 вопросов
				</p>
				<Button
					className="mb-4 opacity-80"
					color="primary"
					variant="contained"
					size="small"
				>
					перейти к тесту
				</Button>
			</div>
		</div>

		<div className="bg-white my-4 mx-6 rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
			<h4 className="text-left m-0 p-3">Тест по истории</h4>
			<Divider className="mx-2" />
			<p className="px-4 text-justify text-sky-600">
				История – это и особая отрасль знания, наука, изучающая развитие
				человеческого общества в прошлом. Главная ее цель – с помощью знаний о
				прошлом способствовать пониманию настоящего и прогнозировать будущее.
			</p>

			<div className="flex justify-between px-4">
				<p className="text-sm antialiased font-semibold text-gray-400 ">
					тест из 20 вопросов
				</p>
				<Button
					className="mb-4 opacity-80"
					color="primary"
					variant="contained"
					size="small"
				>
					перейти к тесту
				</Button>
			</div>
		</div>

		<div className="bg-white my-4 mx-6 rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
			<h4 className="text-left m-0 p-3">Тест по истории</h4>
			<Divider className="mx-2" />
			<p className="px-4 text-justify text-sky-600">
				История – это и особая отрасль знания, наука, изучающая развитие
				человеческого общества в прошлом. Главная ее цель – с помощью знаний о
				прошлом способствовать пониманию настоящего и прогнозировать будущее.
			</p>

			<div className="flex justify-between px-4">
				<p className="text-sm antialiased font-semibold text-gray-400 ">
					тест из 20 вопросов
				</p>
				<Button
					className="mb-4 opacity-80"
					color="primary"
					variant="contained"
					size="small"
				>
					перейти к тесту
				</Button>
			</div>
		</div>

		<div className="bg-white my-4 mx-6 rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
			<h4 className="text-left m-0 p-3">Тест по истории</h4>
			<Divider className="mx-2" />
			<p className="px-4 text-justify text-sky-600">
				История – это и особая отрасль знания, наука, изучающая развитие
				человеческого общества в прошлом. Главная ее цель – с помощью знаний о
				прошлом способствовать пониманию настоящего и прогнозировать будущее.
			</p>

			<div className="flex justify-between px-4">
				<p className="text-sm antialiased font-semibold text-gray-400 ">
					тест из 20 вопросов
				</p>
				<Button
					className="mb-4 opacity-80"
					color="primary"
					variant="contained"
					size="small"
				>
					перейти к тесту
				</Button>
			</div>
		</div>

		<div className="bg-white my-4 mx-6 rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
			<h4 className="text-left m-0 p-3">Тест по истории</h4>
			<Divider className="mx-2" />
			<p className="px-4 text-justify text-sky-600">
				История – это и особая отрасль знания, наука, изучающая развитие
				человеческого общества в прошлом. Главная ее цель – с помощью знаний о
				прошлом способствовать пониманию настоящего и прогнозировать будущее.
			</p>

			<div className="flex justify-between px-4">
				<p className="text-sm antialiased font-semibold text-gray-400 ">
					тест из 20 вопросов
				</p>
				<Button
					className="mb-4 opacity-80"
					color="primary"
					variant="contained"
					size="small"
				>
					перейти к тесту
				</Button>
			</div>
		</div>

		<div className="bg-white my-4 mx-6 rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
			<h4 className="text-left m-0 p-3">Тест по истории</h4>
			<Divider className="mx-2" />
			<p className="px-4 text-justify text-sky-600">
				История – это и особая отрасль знания, наука, изучающая развитие
				человеческого общества в прошлом. Главная ее цель – с помощью знаний о
				прошлом способствовать пониманию настоящего и прогнозировать будущее.
			</p>

			<div className="flex justify-between px-4">
				<p className="text-sm antialiased font-semibold text-gray-400 ">
					тест из 20 вопросов
				</p>
				<Button
					className="mb-4 opacity-80"
					color="primary"
					variant="contained"
					size="small"
				>
					перейти к тесту
				</Button>
			</div>
		</div>
	</div>
)

export default QuizzesPage
