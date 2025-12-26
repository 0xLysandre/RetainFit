import { auth, clerkClient } from '@clerk/nextjs/server'
import { CreateOrganization } from '@clerk/nextjs'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, AlertTriangle, Calendar } from "lucide-react"
import { RunAnalysisButton } from "@/components/churn/RunAnalysisButton"
import { getCurrentStudio } from "@/lib/studio"

export default async function DashboardPage() {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    // ... (redirect or existing empty state logic - keeping concise for replacement)
    return <div>Please log in and select an organization.</div>
  }

  const studio = await getCurrentStudio()
  const client = await clerkClient()

  let orgName = studio.name
  try {
    const organization = await client.organizations.getOrganization({ organizationId: orgId })
    orgName = organization.name
  } catch (e) {
    // Fallback to studio name in DB
  }

  const totalMembers = await prisma.member.count({
    where: { studioId: studio.id }
  })

  const activeMembers = await prisma.member.count({
    where: {
      studioId: studio.id,
      status: 'ACTIVE'
    }
  })

  const atRiskMembers = await prisma.member.count({
    where: {
      studioId: studio.id,
      status: 'ACTIVE',
      riskScore: { gt: 50 }
    }
  })

  return (
    <div className="space-y-8">
      <div className="border-b pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Studio Dashboard</h1>
          <p className="text-gray-600">Welcome back, here's what's happening at {orgName}.</p>
        </div>
        <RunAnalysisButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-xs text-muted-foreground">Currently active subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{atRiskMembers}</div>
            <p className="text-xs text-muted-foreground">High probability of churn</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2</div>
            <p className="text-xs text-muted-foreground">Visits per week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/dashboard/members/new" className="p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-center text-center text-sm font-medium">
              Add Member
            </Link>
            <Link href="/dashboard/classes/new" className="p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-center text-center text-sm font-medium">
              Schedule Class
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}