'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  LogOut,
  Headphones,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/categorias', label: 'Categorías', icon: FolderTree },
]

const SIDEBAR_KEY = 'admin-sidebar-collapsed'

export function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(SIDEBAR_KEY)
    if (saved !== null) {
      setIsCollapsed(saved === 'true')
    }
  }, [])

  const toggleCollapse = () => {
    const newValue = !isCollapsed
    setIsCollapsed(newValue)
    localStorage.setItem(SIDEBAR_KEY, String(newValue))
  }

  if (!mounted) {
    return <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 min-h-screen" />
  }

  return (
    <aside
      className={cn(
        'bg-white/5 backdrop-blur-xl border-r border-white/10 min-h-screen flex flex-col transition-all duration-300 relative',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-7 w-6 h-6 bg-[#00FF88] border border-[#00FF88] rounded-full flex items-center justify-center text-[#0A1628] hover:shadow-[0_0_15px_rgba(0,255,136,0.5)] transition-all z-10"
        aria-label={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Logo */}
      <div className={cn('border-b border-white/10', isCollapsed ? 'p-4' : 'p-6')}>
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF88] to-[#00CC6A] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
            <Headphones className="w-6 h-6 text-[#0A1628]" />
          </div>
          {!isCollapsed && (
            <div>
              <span className="text-lg font-bold text-white">InEars</span>
              <span className="block text-xs text-gray-400">Admin Panel</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className={cn('flex-1 space-y-1', isCollapsed ? 'p-2' : 'p-4')}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                'flex items-center rounded-xl text-sm font-medium transition-all duration-200',
                isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3',
                isActive
                  ? 'bg-gradient-to-r from-[#00FF88] to-[#00CC6A] text-[#0A1628] shadow-[0_0_20px_rgba(0,255,136,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={cn('border-t border-white/10 space-y-2', isCollapsed ? 'p-2' : 'p-4')}>
        <Link
          href="/"
          target="_blank"
          title={isCollapsed ? 'Ver Sitio' : undefined}
          className={cn(
            'flex items-center rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all',
            isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
          )}
        >
          <ExternalLink className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && 'Ver Sitio'}
        </Link>
        <Button
          variant="ghost"
          title={isCollapsed ? 'Cerrar Sesión' : undefined}
          className={cn(
            'w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl',
            isCollapsed ? 'justify-center px-3' : 'justify-start gap-3 px-4'
          )}
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && 'Cerrar Sesión'}
        </Button>
      </div>
    </aside>
  )
}
