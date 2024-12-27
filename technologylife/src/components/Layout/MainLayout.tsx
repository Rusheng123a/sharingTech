'use client'

import { Header } from './Header'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { Breadcrumb } from './Breadcrumb'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="container py-4">
            <Breadcrumb />
          </div>
          <div className="container flex-1 py-6">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
} 