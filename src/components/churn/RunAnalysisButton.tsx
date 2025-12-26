'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { runChurnAnalysisAction } from "@/app/actions/analyze"

export function RunAnalysisButton() {
    const [loading, setLoading] = useState(false)

    const handleRunAnalysis = async () => {
        setLoading(true)
        try {
            const result = await runChurnAnalysisAction()
            if (result.success) {
                // Ideally show a toast
                console.log(`Analyzed ${result.count} members`)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleRunAnalysis}
            disabled={loading}
        >
            <RefreshCcw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Analyzing...' : 'Run Analysis'}
        </Button>
    )
}
