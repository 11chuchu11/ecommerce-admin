'use server'
import prismadb from '@/lib/prismadb'
import BillboardClient from './components/client'
import { BillboardColumn } from './components/columns'
import {format} from 'date-fns'

interface Props {
	params: {
		storeId: string
	}
}

const BillboardPage = async ({ params: { storeId } }: Props) => {
	const billboards = await prismadb.billboard.findMany({ where: { storeId }, orderBy: { createdAt: 'desc' } })
	const formattedBillboards: BillboardColumn[] = billboards.map(billboard => ({
		id: billboard.id,
		label: billboard.label,
		createdAt: format(billboard.createdAt, 'MMMM do, yyyy')
	}))
	return (
		<main className="flex-col">
			<section className="flex-1 space-y-4 p-8 pt-6">
				<BillboardClient data={formattedBillboards} />
			</section>
		</main>
	)
}

export default BillboardPage

