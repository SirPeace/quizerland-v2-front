import { Neucha, Pacifico } from 'next/font/google'

const neucha = Neucha({ subsets: ['cyrillic'], weight: '400' })
const pacifico = Pacifico({ subsets: ['cyrillic'], weight: '400' })

const QuizzesPage = (): JSX.Element => (
	<div className="min-w-full min-h-screen pt-16">
		<span className={`text-3xl mr-3 ${neucha.className}`}>
			Добро пожаловать в
		</span>
		<span className={`text-4xl ${pacifico.className}`}>Quizerland</span>
	</div>
)

export default QuizzesPage
