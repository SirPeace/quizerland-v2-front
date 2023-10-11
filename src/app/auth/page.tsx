import GoToHomePageButton from '@/components/Navigation/GoToHomePageButton/GoToHomePageButton'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Authorization | Quizerland',
	description: 'Страница тестов',
}

const AuthPage = (): JSX.Element => (
	<div className="flex flex-col items-stretch max-w-2xl min-h-screen mx-auto pb-1">
		<h1 className="text-center pt-16 my-0">Авторизация</h1>
		<div className="mt-[10%] mb-auto">
			<GoToHomePageButton />
		</div>
	</div>
)

export default AuthPage
