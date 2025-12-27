import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft, User, Calendar, Activity } from "lucide-react"

interface MemberPageProps {
    params: Promise<{ id: string }>
}

export default async function MemberPage({ params }: MemberPageProps) {
    const { id } = await params

    const member = await prisma.member.findUnique({
        where: { id },
        include: {
            attendance: {
                orderBy: {
                    classSession: {
                        startTime: 'desc'
                    }
                },
                take: 20,
                include: {
                    classSession: true
                }
            },
            studio: true
        }
    })

    if (!member) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/members">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{member.firstName} {member.lastName}</h1>
                    <p className="text-gray-600">Member since {new Date(member.joinDate).toLocaleDateString()}</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Badge variant={member.status === 'ACTIVE' ? 'default' : 'secondary'} className="text-lg px-4 py-1">
                        {member.status}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Risk Card */}
                <Card className={member.riskScore > 50 ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Churn Risk Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{member.riskScore}/100</div>
                        <p className="text-sm text-gray-600 mt-1">
                            {member.riskScore > 75 ? "High likelihood of churn. Immediate action recommended." :
                                member.riskScore > 50 ? "Moderate risk. Monitor attendance." :
                                    "Healthy engagement."}
                        </p>
                    </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <span className="text-xs text-muted-foreground block">Email</span>
                            <span className="font-medium">{member.email}</span>
                        </div>
                        <div>
                            <span className="text-xs text-muted-foreground block">Phone</span>
                            <span className="font-medium">{member.phone || 'N/A'}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Studio Info (Placeholder for more stats) */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Attendance Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{member.attendance.length}</div>
                        <p className="text-sm text-muted-foreground">Total classes attended</p>
                        {member.lastVisitDate && (
                            <p className="text-xs mt-2">Last visit: {new Date(member.lastVisitDate).toLocaleDateString()}</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Recent Attendance</h2>
                <Card>
                    <div className="p-0">
                        <div className="w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Class</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Instructor</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {member.attendance.map((record: any) => (
                                        <tr key={record.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle">{new Date(record.classSession.startTime).toLocaleDateString()} {new Date(record.classSession.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td className="p-4 align-middle font-medium">{record.classSession.name}</td>
                                            <td className="p-4 align-middle">{record.classSession.instructor || 'Unknown'}</td>
                                            <td className="p-4 align-middle">
                                                <Badge variant="outline">{record.status}</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                    {member.attendance.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-4 text-center text-muted-foreground">No attendance records found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
