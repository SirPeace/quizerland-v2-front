'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = (): void => {
	const router = useRouter()

	useEffect(() => {
		router.push('/quizzes')
	}, [router])
}

export default Home
