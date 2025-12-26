'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold">Something went wrong!</h2>
            <p className="text-gray-500 max-w-md text-center">
                We encountered an unexpected error while loading this page. Our team has been notified.
            </p>
            <div className="flex gap-2">
                <Button onClick={() => reset()}>Try again</Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Reload Page
                </Button>
            </div>
        </div>
    )
}
