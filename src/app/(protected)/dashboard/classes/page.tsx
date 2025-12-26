import { prisma } from '@/lib/db'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

import { ArrowLeft, Trash2 } from "lucide-react"

import { deleteClassAction } from "@/app/actions/classes"
import { getCurrentStudio } from "@/lib/studio"

export default async function ClassesPage() {
    const now = new Date();
    const studio = await getCurrentStudio()
    const classes = await prisma.classSession.findMany({
        where: { studioId: studio.id },
        take: 50,
        orderBy: { startTime: 'desc' },
        include: {
            _count: {
                select: { attendance: true }
            }
        }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
                        <p className="text-gray-600">Manage studio classes and sessions</p>
                    </div>
                </div>
                <Link href="/dashboard/classes/new">
                    <Button>Schedule Class</Button>
                </Link>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Class Name</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead className="text-center">Attendees</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {classes.map((session) => (
                            <TableRow key={session.id}>
                                <TableCell>
                                    <div className="font-medium">
                                        {new Date(session.startTime).toLocaleDateString()}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {session.name}
                                </TableCell>
                                <TableCell>
                                    {session.instructor || 'Unassigned'}
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className="inline-flex items-center justify-center bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold">
                                        {session._count.attendance}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end items-center gap-2">
                                        <Link href={`/dashboard/classes/${session.id}/edit`}>
                                            <Button variant="ghost" size="sm">Edit</Button>
                                        </Link>
                                        <form action={deleteClassAction.bind(null, session.id)}>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {classes.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No classes scheduled.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
