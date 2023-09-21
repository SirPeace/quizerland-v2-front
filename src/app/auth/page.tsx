import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Authorization | Quizerland',
	description: 'Страница тестов',
}

const AuthPage = (): JSX.Element => (
	<h1 className="text-center">Страница авторизации</h1>
)

export default AuthPage
