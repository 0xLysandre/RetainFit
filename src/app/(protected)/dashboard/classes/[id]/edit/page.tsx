import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateClassAction } from "@/app/actions/classes"
import Link from 'next/link'
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export default async function EditClassPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const { id } = resolvedParams
    const session = await prisma.classSession.findUnique({
        where: { id }
    })

    if (!session) notFound()

    // Format date and time for inputs
    const startTime = new Date(session.startTime)
    const dateStr = startTime.toISOString().split('T')[0]
    const timeStr = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

    const updateClassWithId = updateClassAction.bind(null, id)

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/classes">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Class</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Class Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={updateClassWithId} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Class Name</Label>
                            <Input id="name" name="name" defaultValue={session.name} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instructor">Instructor Name</Label>
                            <Input id="instructor" name="instructor" defaultValue={session.instructor || ''} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" name="date" type="date" defaultValue={dateStr} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input id="time" name="time" type="time" defaultValue={timeStr} required />
                            </div>
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
