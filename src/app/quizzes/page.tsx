import { Neucha, Pacifico } from 'next/font/google'

const neucha = Neucha({ subsets: ['cyrillic'], weight: '400' })
const pacifico = Pacifico({ subsets: ['cyrillic'], weight: '400' })

const QuizzesPage = () => {
	return (
		<div className='mt-6'>
			<span className={`text-3xl mr-3 ${neucha.className}`}>
				Добро пожаловать в
			</span>
			<span className={`text-4xl ${pacifico.className}`}>Quizerland</span>
		</div>
	)
}

export default QuizzesPage
