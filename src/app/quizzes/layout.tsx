import Link from 'next/link'

export default function QuizzesLayout({
	children,
}: {
	children: React.ReactNode
}): JSX.Element {
	return (
		<div className="text-center">
			<h1>Вложенная Страница</h1>

			<Link href="/quizzes/quiz">Ссылка на страницу Quiz</Link>

			{children}
		</div>
	)
}
