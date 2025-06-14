'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="text-center mt-[20vh] p-2.5">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-gray-700 mb-6">{error.message || 'An unexpected error occurred.'}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
