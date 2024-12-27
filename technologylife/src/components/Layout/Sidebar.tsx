'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronLeft, ChevronRight, LayoutDashboard, Settings, Boxes, Building2Icon,Edit2Icon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Components',
    href: '/components',
    icon: Boxes,
  },
  {
    title: 'Builder',
    href: '/builder',
    icon: Building2Icon,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'ImageEditor',
    href: '/imgeditor',
    icon: Edit2Icon,
  },
 
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        'relative flex flex-col border-r bg-background',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-14 items-center border-b px-3">
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start',
                  collapsed ? 'px-2' : 'px-4'
                )}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && (
                  <span className="ml-2">{item.title}</span>
                )}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
} 