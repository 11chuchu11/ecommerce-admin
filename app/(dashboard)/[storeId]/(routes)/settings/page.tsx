import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import SettingsForm from './components/settings-forms'

interface Props {
	params: { storeId: string }
}

const SettingsPage = async ({ params: { storeId } }: Props) => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

    const store = await prismadb.store.findFirst({ where: { userId, id: storeId } })
    
    if(!store) redirect('/')
	
    return <main className='flex-col'>
        <section className="flex-1 space-y-4 p-8 pt-6">
            <SettingsForm initialData={store}/>
        </section>
    </main>
}

export default SettingsPage

