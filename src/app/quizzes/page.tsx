import { Neucha, Pacifico } from 'next/font/google'

const neucha = Neucha({ subsets: ['cyrillic'], weight: '400' })
const pacifico = Pacifico({ subsets: ['latin'], weight: '400' })

const QuizzesPage = (): JSX.Element => (
	<h1 className="min-w-full min-h-screen pt-16 my-0">
		<span className={`text-3xl ${neucha.className}`}>Добро пожаловать в</span>
		<span className={`text-4xl ${pacifico.className}`}> Quizerland</span>
	</h1>
)

export default QuizzesPage
