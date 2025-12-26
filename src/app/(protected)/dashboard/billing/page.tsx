import { getCurrentStudio } from "@/lib/studio"
import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, CreditCard } from "lucide-react"
import { createCheckoutSessionAction, createPortalSessionAction, mockUpgradeAction } from "@/app/actions/subscription"

export default async function BillingPage() {
    const studio = await getCurrentStudio()
    const subscription = await prisma.subscription.findUnique({
        where: { studioId: studio.id }
    })

    const isPro = subscription?.status === 'active'

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
                <p className="text-gray-600">Manage your plan and payment details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Free Plan */}
                <Card className={isPro ? "border-gray-200 opacity-50" : "border-2 border-green-500 shadow-lg"}>
                    <CardHeader>
                        <CardTitle>Free Starter</CardTitle>
                        <CardDescription>For hobby studios just getting started.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">$0 <span className="text-sm font-normal text-gray-500">/mo</span></div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> Up to 50 members</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> Basic Churn Analysis</li>
                            <li className="flex items-center text-gray-400"><Check className="h-4 w-4 mr-2" /> Automated Email Campaigns</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {isPro ? (
                            <Button variant="outline" disabled className="w-full">Included</Button>
                        ) : (
                            <Button variant="outline" disabled className="w-full border-green-500 text-green-700 font-bold bg-green-50">Current Plan</Button>
                        )}
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className={isPro ? "border-2 border-blue-500 shadow-lg" : "border-gray-200"}>
                    <CardHeader>
                        <CardTitle>Pro Studio</CardTitle>
                        <CardDescription>Automate your retention.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">$29 <span className="text-sm font-normal text-gray-500">/mo</span></div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-blue-500" /> Unlimited members</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-blue-500" /> Advanced Churn AI</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-blue-500" /> Automated Win-back Emails</li>
                            <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-blue-500" /> Priority Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {isPro ? (
                            <form action={createPortalSessionAction} className="w-full">
                                <Button className="w-full">Manage Subscription</Button>
                            </form>
                        ) : (
                            <div className="w-full space-y-2">
                                <form action={createCheckoutSessionAction} className="w-full">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Upgrade to Pro</Button>
                                </form>
                                {/* DEV ONLY MOCK UPGRADE */}
                                <form action={mockUpgradeAction} className="w-full">
                                    <Button variant="ghost" size="sm" className="w-full text-xs text-gray-400">
                                        (Dev) Simulate Successful Payment
                                    </Button>
                                </form>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </div>

            {isPro && (
                <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-md flex items-center gap-4">
                    <CreditCard className="h-8 w-8" />
                    <div>
                        <p className="font-bold">You are a Pro Member</p>
                        <p className="text-sm">Your subscription renews on {subscription?.stripeCurrentPeriodEnd?.toLocaleDateString()}.</p>
                    </div>
                </div>
            )}
        </div>
    )
}
