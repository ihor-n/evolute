import Link from 'next/link'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'User Management Dashboard'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="text-lg font-semibold hover:text-gray-300">
              User Management
            </Link>
            <Link href="/statistics" className="text-lg font-semibold hover:text-gray-300">
              User Statistics
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
