import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createMemberAction } from "@/app/actions/members"
import Link from 'next/link'
import { ArrowLeft } from "lucide-react"

export default function AddMemberPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Add New Member</h1>
                </div>
                <div className="flex gap-2">
                    <Link href="/dashboard/members">
                        <Button variant="outline" size="sm">View Members</Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Member Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createMemberAction} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" name="firstName" placeholder="Jane" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" name="lastName" placeholder="Doe" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                            <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit">Create Member</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
