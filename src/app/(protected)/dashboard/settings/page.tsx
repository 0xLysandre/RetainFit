import { getCurrentStudio } from "@/lib/studio"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateStudioAction } from "@/app/actions/studio"

export default async function SettingsPage() {
    const studio = await getCurrentStudio()

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">Manage your studio preferences.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Studio Profile</CardTitle>
                    <CardDescription>
                        Update your studio's display name. This name is used internally within RetainFit.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={updateStudioAction} className="space-y-4 max-w-md">
                        <div className="space-y-2">
                            <Label htmlFor="name">Studio Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={studio.name}
                                required
                            />
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                <h3 className="font-semibold text-yellow-800">Note on Organizations</h3>
                <p className="text-sm text-yellow-700 mt-1">
                    Your primary organization name is managed by Clerk (the authentication provider).
                    Changing the name here updates your internal RetainFit display name, but may not sync back to Clerk depending on permissions.
                </p>
            </div>
        </div>
    )
}
