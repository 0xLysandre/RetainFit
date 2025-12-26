import { auth } from '@clerk/nextjs/server'
import { CreateOrganization } from '@clerk/nextjs'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, AlertTriangle, Calendar } from "lucide-react"

export default async function DashboardPage() {
  const { userId, orgId } = await auth()

  if (!userId) {
    return <div>Loading...</div>
  }

  if (!orgId) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to RetainFit
        </h2>
        <p className="text-gray-600 mb-8">
          You need to create or join a fitness studio to get started.
        </p>
        <div className="space-y-4">
          <CreateOrganization
            appearance={{
              elements: {
                formButtonPrimary: "bg-green-600 hover:bg-green-700"
              }
            }}
          />
          <div className="text-sm text-gray-500">
            Or if you were invited, check your email for the invitation link.
          </div>
        </div>
      </div>
    )
  }

  // Fetch Stats (Mocking studio ID linkage for now as Clerk Org ID might not match seeded Studio ID directly unless synced. 
  // In a real app, we'd map orgId to studio.id. For this MVP/Demo, we might grab the first studio or try to match.)

  // TODO: Implement proper Org -> Studio mapping. For now, we'll fetch the first studio or all data if no studio found.
  // In the future, we should store clerkOrgId on the Studio model.

  const studio = await prisma.studio.findFirst()

  const totalMembers = await prisma.member.count({
    where: studio ? { studioId: studio.id } : undefined
  })

  const activeMembers = await prisma.member.count({
    where: {
      ...(studio ? { studioId: studio.id } : {}),
      status: 'ACTIVE'
    }
  })

  // Defining "At Risk" as Active members with Risk Score > 50 or explicitly marked
  // For this MVP, let's assume we want to count those who are Active but have high risk.
  // Since we haven't implemented the risk calc engine yet, we'll rely on the seeded data if available or just show 0.
  // The seed data has some logic.
  const atRiskMembers = await prisma.member.count({
    where: {
      ...(studio ? { studioId: studio.id } : {}),
      status: 'ACTIVE',
      riskScore: { gt: 50 }
    }
  })

  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Studio Dashboard</h1>
        <p className="text-gray-600">Welcome back, here's what's happening at {studio?.name || 'your studio'}.</p>
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
        {/* Quick Actions / Recent Activity placeholders */}
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