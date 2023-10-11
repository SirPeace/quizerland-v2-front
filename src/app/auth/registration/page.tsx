import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Registration | Quizerland',
	description: 'Страница регистрации пользователя',
}

const RegistrationPage = (): JSX.Element => (
	<div className="bg-slate-100 w-full">
		<div className="flex flex-col items-stretch max-w-lg min-h-screen mx-auto">
			<div className="mt-[20%] mb-auto">
				<RegistrationForm />
			</div>
		</div>
	</div>
)

export default RegistrationPage
