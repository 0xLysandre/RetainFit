'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentStudio } from "@/lib/studio"
import { classSchema } from "@/lib/validations"

export async function scheduleClassAction(formData: FormData) {
    const name = formData.get('name') as string
    const instructor = formData.get('instructor') as string
    const date = formData.get('date') as string
    const time = formData.get('time') as string

    const studio = await getCurrentStudio()

    const validatedData = classSchema.parse({
        name: formData.get('name'),
        instructor: formData.get('instructor') || undefined,
        date: formData.get('date'),
        time: formData.get('time')
    })

    // Combine date and time
    const startTime = new Date(`${validatedData.date}T${validatedData.time}`)

    await prisma.classSession.create({
        data: {
            name: validatedData.name,
            instructor: validatedData.instructor,
            startTime,
            studioId: studio.id
        }
    })

    revalidatePath('/dashboard/classes')
    redirect('/dashboard/classes')
}

export async function updateClassAction(id: string, formData: FormData) {
    const name = formData.get('name') as string
    const instructor = formData.get('instructor') as string
    const date = formData.get('date') as string
    const time = formData.get('time') as string

    const validatedData = classSchema.parse({
        name: formData.get('name'),
        instructor: formData.get('instructor') || undefined,
        date: formData.get('date'),
        time: formData.get('time')
    })

    const startTime = new Date(`${validatedData.date}T${validatedData.time}`)

    await prisma.classSession.update({
        where: { id },
        data: {
            name: validatedData.name,
            instructor: validatedData.instructor,
            startTime
        }
    })

    revalidatePath('/dashboard/classes')
    redirect('/dashboard/classes')
}

export async function deleteClassAction(id: string) {
    await prisma.$transaction([
        prisma.attendance.deleteMany({ where: { classSessionId: id } }),
        prisma.classSession.delete({ where: { id } })
    ])

    revalidatePath('/dashboard/classes')
}
