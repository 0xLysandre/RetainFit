import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateMemberAction } from "@/app/actions/members"
import Link from 'next/link'
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const { id } = resolvedParams
    const member = await prisma.member.findUnique({
        where: { id }
    })

    if (!member) notFound()

    // Bind the ID to the server action
    const updateMemberWithId = updateMemberAction.bind(null, id)

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/members">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Member</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Member Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={updateMemberWithId} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" name="firstName" defaultValue={member.firstName} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" name="lastName" defaultValue={member.lastName} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" defaultValue={member.email} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                            <Input id="phone" name="phone" defaultValue={member.phone || ''} />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
