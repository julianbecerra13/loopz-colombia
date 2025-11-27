import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}
