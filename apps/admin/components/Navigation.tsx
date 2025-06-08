import React from 'react'
import Link from 'next/link'

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-lg font-semibold hover:text-gray-300">
          User Management
        </Link>
        <Link href="/statistics" className="text-lg font-semibold hover:text-gray-300">
          User Statistics
        </Link>
        <Link href="/manufacturers" className="text-lg font-semibold hover:text-gray-300">
          Manufacturers
        </Link>
      </div>
    </nav>
  )
}

Navigation.displayName = 'Navigation'
