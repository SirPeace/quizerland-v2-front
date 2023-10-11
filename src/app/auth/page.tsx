'use client'

import SignInForm from '@/components/AuthComponents/SignInForm'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Authorization | Quizerland',
	description: 'Страница тестов',
}

const AuthPage = (): JSX.Element => (
	<div className="flex flex-col items-stretch max-w-lg min-h-screen mx-auto">
		<div className="mt-[10%] mb-auto">
			<SignInForm />
		</div>
	</div>
)

export default AuthPage
