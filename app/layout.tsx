import './globals.css'
import Image from "next/image"

export const metadata = {
  title: 'InvestPlan',
  description: 'Belajar Simulasi Investasi dengan Cara Mudah',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-gray-900">
        {/* Background image */}
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover -z-10"
          loading="eager"
        />
        {/* Overlay tipis biar teks kontras */}
        <div className="absolute inset-0 bg-white/50 -z-10" />

        {children}
      </body>
    </html>
  )
}
