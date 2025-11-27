import { getServerSession } from 'next-auth'
import { AdminSidebar } from '@/components/admin/sidebar'
import { SessionProvider } from '@/components/providers/session-provider'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2A] to-[#1a0a2e] relative">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00FF88]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#1E3A5F]/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>
        {session && <AdminSidebar />}
        <main className="flex-1 relative z-10">{children}</main>
      </div>
    </SessionProvider>
  )
}
