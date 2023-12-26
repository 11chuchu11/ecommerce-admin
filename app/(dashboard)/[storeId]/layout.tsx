import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	params: { storeId: string }
}

const DashboardLayout = async ({ params, children }: Props) => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	})

	if (!store) redirect('/')
	return (
		<>
      <Navbar/>
      {children}
		</>
	)
}

export default DashboardLayout
