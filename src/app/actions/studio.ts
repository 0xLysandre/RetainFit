'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { getCurrentStudio } from "@/lib/studio"
import { studioSchema } from "@/lib/validations"
import { z } from "zod"

export async function updateStudioAction(formData: FormData) {
    const rawData = {
        name: formData.get('name') as string,
    }

    // Validate input
    const validatedData = studioSchema.parse(rawData)

    const studio = await getCurrentStudio()

    await prisma.studio.update({
        where: { id: studio.id },
        data: {
            name: validatedData.name,
        },
    })

    revalidatePath('/dashboard/settings')
    revalidatePath('/dashboard') // Update dashboard header name
}
