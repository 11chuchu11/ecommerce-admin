'use client'
import { AlertModal } from '@/components/modals'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, Heading, ImageUpload, Input, Separator } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Billboard } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'

interface Props {
	initialData: Billboard | null
}

const formSchema = z.object({
	label: z.string().min(1, 'Label is required'),
	imageUrl: z.string().min(1, 'Image Url is required'),
})

type BillboardFormValues = z.infer<typeof formSchema>

const BillboardForm: FC<Props> = ({ initialData }: Props) => {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const { storeId, billboardId  } = useParams()
	const router = useRouter()

	const title = initialData ? 'Edit billboard' : 'Create Billboard'
	const description = initialData ? 'Edit billboard' : 'Create a new billboard'
	const toastMessage = initialData ? 'Billboard updated' : 'Billboard created'
	const action = initialData ? 'Save changes' : 'Create'

	const onSubmit = async (data: BillboardFormValues) => {
		try {
			setLoading(true)
			if (initialData) 
				await axios.patch(`/api/${storeId}/billboards/${billboardId}`, data)
			else await axios.post(`/api/${storeId}/billboards`, data)
			router.refresh()
			router.push(`/${storeId}/billboards`)
			toast.success(toastMessage)
		} catch (error) {
			toast.error('Something went wrong.')
		} finally {
			setLoading(false)
		}
	}

	const onDelete = async () => {
		try {
			setLoading(true)
			await axios.delete(`/api/${storeId}/billboards/${billboardId}`)
			router.refresh()
			router.push(`/${storeId}/billboards`)
			toast.success('Billboard deleted.')
		} catch (error) {
			toast.error('Make sure you removed all categories using this billboard.')
		} finally {
			setLoading(false)
			setOpen(false)
		}
	}

	const form = useForm<BillboardFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || { label: '', imageUrl: '' },
	})

	return (
		<>
			<AlertModal onConfirm={() => onDelete()} isOpen={open} onClose={() => setOpen(false)} loading={loading} />
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem className="">
								<FormLabel>Background Image</FormLabel>
								<FormControl>
                                    <ImageUpload value={field.value ? [field.value] : []} disabled={loading } onChange={(url) =>field.onChange(url)} onRemove={()=>field.onChange('')} />
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input disabled={loading} placeholder="Billboard label" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className="ml-auto" type="submit">
						{' '}
						{action}
					</Button>
				</form>
			</Form>
		</>
	)
}

export default BillboardForm

