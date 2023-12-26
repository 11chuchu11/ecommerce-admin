'use client'
import { FC, PropsWithChildren } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Props extends PropsWithChildren {
	title: string
	description: string
	isOpen: boolean
	onClose: () => void
}

const Modal: FC<Props> = ({ description, isOpen, onClose, title, children }: Props) => {
	const onChange = (open: boolean) => {
		if (!isOpen) onClose()
	}
	return (
		<Dialog open={isOpen} onOpenChange={onChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}

export default Modal

