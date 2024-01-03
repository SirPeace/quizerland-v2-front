'use client'

import SignInForm from '@/components/Auth/SingInForm/SignInForm'

const AuthPage = (): JSX.Element => (
  <div className="w-full bg-slate-100">
    <div className="flex flex-col items-stretch max-w-lg min-h-screen px-3 mx-auto">
      <SignInForm />
    </div>
  </div>
)

export default AuthPage
