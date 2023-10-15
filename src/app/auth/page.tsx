import SignInForm from '@/components/Auth/SingInForm/SignInForm'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Авторизация | Quizerland',
  description: 'Страница авторизации пользователя',
}

const AuthPage = (): JSX.Element => (
  <div className="w-full bg-slate-100">
    <div className="flex flex-col items-stretch max-w-lg min-h-screen mx-auto">
      <div className="mt-[25%] mb-auto">
        <SignInForm />
      </div>
    </div>
  </div>
)

export default AuthPage
