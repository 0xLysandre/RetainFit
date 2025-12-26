import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { importMembersAction } from "@/app/actions/import"
import { ArrowLeft } from "lucide-react"
import Link from 'next/link'

export default async function ImportMembersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 border-b pb-4">
                <Link href="/dashboard/members">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Import Members</h1>
                    <p className="text-gray-600">Bulk upload members via CSV.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upload CSV File</CardTitle>
                    <CardDescription>
                        Your file must include the following headers: <strong>firstName, lastName, email</strong>. Phone is optional.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={importMembersAction} className="space-y-4 max-w-md">
                        <div className="space-y-2">
                            <Label htmlFor="file">Select File</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept=".csv"
                                required
                            />
                        </div>

                        <div className="bg-gray-50 p-4 rounded text-sm font-mono border">
                            firstName,lastName,email<br />
                            John,Doe,john@example.com<br />
                            Jane,Smith,jane@example.com
                        </div>

                        <Button type="submit">Upload & Import</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
