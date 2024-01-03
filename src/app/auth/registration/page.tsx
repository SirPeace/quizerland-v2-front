'use client'

import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm'

const RegistrationPage = (): JSX.Element => (
  <div className="bg-slate-100 w-full">
    <div className="flex flex-col items-stretch max-w-lg min-h-screen mx-auto px-3">
      <RegistrationForm />
    </div>
  </div>
)

export default RegistrationPage
