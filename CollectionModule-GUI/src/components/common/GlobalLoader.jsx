import { useEffect, useState } from 'react'
import { subscribeApiLoading } from '../../services/apiService'

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeApiLoading(setIsLoading)
    return unsubscribe
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
      <div className="flex items-center gap-3 rounded-lg bg-white px-5 py-3 shadow-xl">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
        <span className="text-sm font-medium text-gray-800">Loading...</span>
      </div>
    </div>
  )
}
