import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEXTREND',
  description: 'bring your projects to life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <header>
          <nav>
            <ul>
              <a href="/">
                <li>Home</li>
              </a>
              <a href="/buscador">
                <li>Search</li>
              </a>
              <a href="/dashboard">
                <li>dashboard</li>
              </a>
              <a href="/nosotros">
                <li>About us</li>
              </a>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
