import React from 'react'
import Link from 'next/link'

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
        <Link href="/" className="text-lg font-semibold hover:text-gray-300 mb-2 md:mb-0">
          User Management
        </Link>
        <div className="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-0 items-center">
          <Link href="/statistics" className="text-lg font-semibold hover:text-gray-300 py-1 md:py-0">
            User Statistics
          </Link>
          <Link href="/manufacturers" className="text-lg font-semibold hover:text-gray-300 py-1 md:py-0">
            Manufacturers
          </Link>
        </div>
      </div>
    </nav>
  )
}

Navigation.displayName = 'Navigation'
