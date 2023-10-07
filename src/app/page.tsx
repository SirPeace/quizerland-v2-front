'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const HomePage = (): JSX.Element => {
	const router = useRouter()

	useEffect(() => {
		router.push('/quizzes')
	}, [router])

	return <></>
}

export default HomePage
