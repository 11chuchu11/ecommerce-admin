'use client'
import { AlertModal } from '@/components/modals'
import { ApiAlert, Button, Form, FormControl, FormField, FormItem, FormLabel, Heading, Input, Separator } from '@/components/ui'
import { useOrigin } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
interface Props {
	initialData: Store
}

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
})

type SettingsFormValues = z.infer<typeof formSchema>

const SettingsForm: FC<Props> = ({ initialData }: Props) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { storeId } = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${storeId}`, data)
            router.refresh()
            toast.success('Store updated.')
        }
        catch (error) {
            toast.error('Something went wrong.')
        }
        finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${storeId}`)
            router.refresh()
            router.push('/')
            toast.success('Store deleted.')
        }
        catch (error) {
            toast.error("Make sure you removed all products and categories first.");
        }
        finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	})

	return (
        <>
            <AlertModal onConfirm={ ()=>onDelete()} isOpen={open } onClose={()=>setOpen(false)} loading={loading}  />
			<div className="flex items-center justify-between">
				<Heading title="Settings" description="Manage store preferences." />
                <Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
					<Trash className="h-4 w-4" />
				</Button>
			</div>
			<Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField control={form.control} name='name' render={({ field }) => (<FormItem className=''>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={ loading } placeholder='Store name' {...field} />
                            </FormControl>
                        </FormItem>)}/>
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'> Save Changes</Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert title='NEXT_PUBLIC_API_URL' description={`${origin}/api/${storeId}`} variant='public'/>
        </>
	)
}

export default SettingsForm

