'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentStudio } from "@/lib/studio"
import { memberSchema } from "@/lib/validations"
import Papa from "papaparse"

export async function importMembersAction(formData: FormData) {
    const file = formData.get('file') as File

    if (!file) {
        throw new Error('No file provided')
    }

    const text = await file.text()
    const studio = await getCurrentStudio()

    // Parse CSV
    const { data, errors } = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
    })

    if (errors.length > 0) {
        console.error('CSV Parsing errors:', errors)
        throw new Error('Failed to parse CSV file')
    }

    let successCount = 0
    let failureCount = 0

    // Process each row
    for (const row of data as any[]) {
        try {
            // Map CSV columns to schema keys if needed (assuming matching names for now)
            // Expected CSV headers: firstName, lastName, email, phone (optional)

            const validatedData = memberSchema.parse({
                firstName: row.firstName,
                lastName: row.lastName,
                email: row.email,
                phone: row.phone || undefined
            })

            await prisma.member.create({
                data: {
                    ...validatedData,
                    studioId: studio.id,
                    status: 'ACTIVE'
                }
            })
            successCount++
        } catch (error) {
            console.error('Failed to import row:', row, error)
            failureCount++
        }
    }

    revalidatePath('/dashboard/members')
    redirect('/dashboard/members?import=success')
}
