import { prisma } from '@/lib/db'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default async function MembersPage() {
    const members = await prisma.member.findMany({
        take: 50,
        orderBy: { riskScore: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Members</h1>
                    <p className="text-gray-600">View and manage your studio members</p>
                </div>
                <Link href="/dashboard/members/new">
                    <Button>Add Member</Button>
                </Link>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Risk Score</TableHead>
                            <TableHead>Last Visit</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell className="font-medium">
                                    {member.firstName} {member.lastName}
                                    <div className="text-xs text-muted-foreground">{member.email}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={member.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                        {member.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold ${member.riskScore > 75 ? 'text-red-600' :
                                                member.riskScore > 50 ? 'text-yellow-600' : 'text-green-600'
                                            }`}>
                                            {member.riskScore}
                                        </span>
                                        {/* Simple graphical indicator */}
                                        <div className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${member.riskScore > 75 ? 'bg-red-500' :
                                                        member.riskScore > 50 ? 'bg-yellow-500' : 'bg-green-500'
                                                    }`}
                                                style={{ width: `${member.riskScore}%` }}
                                            />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {member.lastVisitDate ? new Date(member.lastVisitDate).toLocaleDateString() : 'Never'}
                                </TableCell>
                                <TableCell className="text-right">
                                    {/* Placeholder for actions */}
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {members.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No members found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
