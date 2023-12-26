'use client'

import { ApiList, Button, DataTable, Heading, Separator } from '@/components/ui'
import { Billboard } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { BillboardColumn, columns } from './columns'

interface Props{
	data: BillboardColumn[]
}

const BillboardClient:FC<Props> = ({data}) => {

    const router = useRouter()
    const { storeId } = useParams()
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading title={`Billboards (${data.length})`} description="Manage billboards for your store" />
				<Button onClick={ () => router.push(`/${storeId}/billboards/new`)}>
					<Plus className="mr-2 h-4 w-4" />
					AddNew
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={data} searchKey='label' />
			<Heading title='API' description='API calls billboards' />
			<Separator />
			<ApiList entityName='billboards' entityIdName={`billboardId`} />
		</>
	)
}

export default BillboardClient

