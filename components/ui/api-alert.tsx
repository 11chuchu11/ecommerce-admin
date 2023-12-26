'use client'
import { FC } from 'react'
import { Alert, AlertDescription, AlertTitle, Badge, BadgeProps, Button } from '@/components/ui'
import { Copy, Server } from 'lucide-react'
import toast from 'react-hot-toast'

interface Props {
	title: string
	description: string
	variant: 'public' | 'admin'
}

const TextMap: Record<Props['variant'], string> = {
	public: 'Public',
	admin: 'Admin',
}

const VariantMap: Record<Props['variant'], BadgeProps['variant']> = {
	public: 'secondary',
	admin: 'destructive',
}

const ApiAlert: FC<Props> = ({ description, title, variant = 'public' }) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success('API Route copied to the clipboard.')
    }
	return (
		<Alert>
			<Server className="h-4 w-4" />
			<AlertTitle className="flex items-center gap-x-2">
				{title}
				<Badge variant={VariantMap[variant]}>{TextMap[variant]}</Badge>
			</AlertTitle>
			<AlertDescription className="mt-4 flex items-center justify-between">
				<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{description}</code>
				<Button variant='outline' size='icon' onClick={onCopy}>
					<Copy className='h-4 w-4'/>
				</Button>
			</AlertDescription>
		</Alert>
	)
}

export default ApiAlert

