'use client'

import { useSession } from 'next-auth/react'
import { Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const { data: session } = useSession()

  return (
    <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white hover:bg-white/10 rounded-xl">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#00FF88] rounded-full shadow-[0_0_8px_rgba(0,255,136,0.6)]" />
          </Button>

          {/* User */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00FF88]/20 to-[#00CC6A]/20 border border-[#00FF88]/30 flex items-center justify-center">
              <User className="w-5 h-5 text-[#00FF88]" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-400">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
