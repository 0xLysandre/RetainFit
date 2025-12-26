'use server'

import { prisma } from "@/lib/db"
import { getCurrentStudio } from "@/lib/studio"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function createCheckoutSessionAction() {
    const studio = await getCurrentStudio()

    // Check if subscription already exists (and return portal session instead? or error?)
    // For simplicity, always create checkout for now.

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
                quantity: 1,
            },
        ],
        customer_email: undefined, // Could grab from user, but clerk user email might different
        metadata: {
            studioId: studio.id,
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    })

    if (!session.url) {
        throw new Error('Failed to create checkout session')
    }

    redirect(session.url)
}

export async function createPortalSessionAction() {
    const studio = await getCurrentStudio()

    const subscription = await prisma.subscription.findUnique({
        where: { studioId: studio.id }
    })

    if (!subscription?.stripeCustomerId) {
        throw new Error('No subscription found')
    }

    const session = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    })

    redirect(session.url)
}

// MOCK ACTION FOR TESTING WITHOUT REAL STRIPE WEBHOOKS
export async function mockUpgradeAction() {
    const studio = await getCurrentStudio()

    // Simulate a successful subscription
    await prisma.subscription.upsert({
        where: { studioId: studio.id },
        update: {
            status: 'active',
            stripeCustomerId: 'cus_mock_' + Math.random().toString(36),
            stripeSubscriptionId: 'sub_mock_' + Math.random().toString(36),
            stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        create: {
            studioId: studio.id,
            status: 'active',
            stripeCustomerId: 'cus_mock_' + Math.random().toString(36),
            stripeSubscriptionId: 'sub_mock_' + Math.random().toString(36),
            stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
    })

    revalidatePath('/dashboard/billing')
}
