'use client'

import { useStoreModal } from '@/hooks'
import { useEffect } from 'react'

export default function SetupPage() {
	const {onOpen, isOpen} = useStoreModal()

	useEffect(() => {
		if (!isOpen) onOpen()
	}, [onOpen, isOpen])
	

	return null
}

