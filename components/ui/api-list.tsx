'use client'

import { useOrigin } from '@/hooks'
import { useParams } from 'next/navigation'
import { FC } from 'react'
import { ApiAlert } from '.'

interface Props {
	entityName: string
	entityIdName: string
}

const ApiList: FC<Props> = ({ entityIdName, entityName }) => {
	const { storeId } = useParams()
	const origin = useOrigin()

	const baseUrl = `${origin}/api/${storeId}`
	return (
		<>
			<ApiAlert title="GET" variant='public' description={`${baseUrl}/${entityName}`} />
			<ApiAlert title="GET" variant='public' description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
			<ApiAlert title="POST" variant='admin' description={`${baseUrl}/${entityName}`} />
			<ApiAlert title="PATCH" variant='admin' description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
			<ApiAlert title="DELETE" variant='admin' description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
		</>
	)
}

export default ApiList

