import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { scheduleClassAction } from "@/app/actions/classes"
import Link from 'next/link'
import { ArrowLeft } from "lucide-react"

export default function ScheduleClassPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Schedule Class</h1>
                </div>
                <div className="flex gap-2">
                    <Link href="/dashboard/classes">
                        <Button variant="outline" size="sm">View Classes</Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Class Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={scheduleClassAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Class Name</Label>
                            <Input id="name" name="name" placeholder="Morning Flow Yoga" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instructor">Instructor Name</Label>
                            <Input id="instructor" name="instructor" placeholder="Sarah Smith" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" name="date" type="date" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input id="time" name="time" type="time" required />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit">Schedule Class</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
