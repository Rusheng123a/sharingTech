'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 text-center">
            <span className="font-bold ">TechLife</span>
          </Link>
          {/* <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/builder">Page Builder</Link>
            <Link href="/components">Components</Link>
          </nav> */}
        </div>
        <div className="flex-1" />
        <div className="flex items-center justify-between space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {session ? (
            <Button variant="ghost" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
} 