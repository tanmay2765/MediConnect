"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">MediConnect</div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">Connect Medicine Donors with Recipients</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            MediConnect is a platform dedicated to reducing medicine wastage by connecting donors with recipients who
            need medicines. Together, we can make healthcare more accessible and sustainable.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Donating
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                Find Medicines
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">💊</div>
            <h3 className="text-xl font-semibold mb-2">For Donors</h3>
            <p className="text-gray-600">
              Donate unused medicines safely and securely. Track your donations and make a real impact in your
              community.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">For Recipients</h3>
            <p className="text-gray-600">
              Find affordable medicines from verified donors. Browse available medicines and claim what you need.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Impact Tracking</h3>
            <p className="text-gray-600">
              See the real impact of your contributions. Track medicines distributed and waste reduced in real-time.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
