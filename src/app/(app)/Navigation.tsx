'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Bell, LayoutDashboard, Briefcase, PiggyBank, LogOut } from 'lucide-react'
import Logo from '@/components/logo'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar, SidebarSection } from "@/components/ui/sidebar"

interface User {
  name: string
  email: string
}

interface NavigationProps {
  user: User
}

export default function Navigation({ user }: NavigationProps) {
  const { logout } = useAuth()
  const [status, setStatus] = useState<string | null>(null)
  const pathname = usePathname()

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    logout({ setStatus })
  }

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/drafts', label: 'Drafts', icon: Briefcase },
    { href: '/published', label: 'Published', icon: PiggyBank },
  ]

  return (
    <nav className="bg-slate-100 shadow-sm">
      {status && (
        <Alert>
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <Sidebar className="border-r-0">
                  <SidebarSection>
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
                          pathname === item.href ? 'bg-gray-100 text-gray-900' : ''
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </SidebarSection>
                </Sidebar>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
              {/* <Logo className="block h-8 w-auto" /> */}
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
                  pathname === item.href ? 'bg-gray-100 text-gray-900' : ''
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">View notifications</span>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </Button>
            <Button
              variant="ghost"
              className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-50 lg:hidden"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}