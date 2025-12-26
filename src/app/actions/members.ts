'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentStudio } from "@/lib/studio"
import { memberSchema } from "@/lib/validations"

export async function createMemberAction(formData: FormData) {
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

    const studio = await getCurrentStudio()

    const validatedData = memberSchema.parse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone') || undefined
    })

    await prisma.member.create({
        data: {
            ...validatedData,
            studioId: studio.id,
            status: 'ACTIVE'
        }
    })

    revalidatePath('/dashboard/members')
    redirect('/dashboard/members')
}

export async function updateMemberAction(id: string, formData: FormData) {
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

    const validatedData = memberSchema.parse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone') || undefined
    })

    await prisma.member.update({
        where: { id },
        data: validatedData
    })

    revalidatePath('/dashboard/members')
    revalidatePath(`/dashboard/members/${id}`)
    redirect('/dashboard/members')
}

export async function deleteMemberAction(id: string) {
    // Transactional delete to clean up related data first
    await prisma.$transaction([
        prisma.attendance.deleteMany({ where: { memberId: id } }),
        prisma.campaignLog.deleteMany({ where: { memberId: id } }),
        prisma.member.delete({ where: { id } })
    ])

    revalidatePath('/dashboard/members')
}
