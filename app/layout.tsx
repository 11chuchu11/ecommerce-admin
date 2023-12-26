import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'

import '@/app/globals.css'
import { ToasterProvider, ModalProvider } from '@/providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Adm. Dashboard',
	description: 'Adm. Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<ToasterProvider/>
					<ModalProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}

