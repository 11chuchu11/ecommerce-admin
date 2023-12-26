import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Auth | By Clerk',
	description: 'Adm. Dashboard',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <main className="h-full flex justify-center items-center">{children}</main>
}

