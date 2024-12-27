import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { cn } from '@/lib/utils'
import { MainLayout } from '@/components/Layout/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TechLife - Your Technology Platform',
  description: 'A modern platform for technology enthusiasts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )}>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  )
}
