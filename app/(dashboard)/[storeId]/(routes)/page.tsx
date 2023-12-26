import prismadb from '@/lib/prismadb'

interface Props  {
	params: { storeId: string }
}
export default async function DashboardPage({ params: { storeId } }: Props) {
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId
        }
    })

    return <main>
        <div>Store : {store?.name}</div>
    </main>
}
