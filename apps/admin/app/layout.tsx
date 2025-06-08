import { Navigation } from '@/components'

import '@/app/globals.css'

export const metadata = {
  title: 'User Management Dashboard'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
