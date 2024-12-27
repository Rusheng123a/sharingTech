'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`
        return (
          <div key={href} className="flex items-center">
            <ChevronRight className="h-4 w-4" />
            {index % 2 === 0 ? (
              <Link
                href={href}
                className="ml-1 capitalize hover:text-foreground"
              >
                {segment}
              </Link>
            ) : (
              <button
                onClick={() => console.log('Button clicked')}
                className="ml-1 capitalize hover:text-foreground"
              >
                {segment}
              </button>
            )}
          </div>
        )
      })}
    </nav>
  )
} 