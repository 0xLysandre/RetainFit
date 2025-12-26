
import { prisma } from '../src/lib/db'


async function main() {
  console.log('Seeding database...')

  // 1. Create Studio
  const studio = await prisma.studio.create({
    data: {
      name: 'Zen Yoga Boutique',
      clerkOrgId: 'seed_org_123'
    },
  })
  console.log('Created Studio:', studio.name)

  // 2. Create Members
  // We need current date to calculate relative dates
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

  const membersData = [
    { firstName: 'Alice', lastName: 'Active', email: 'alice@example.com', status: 'ACTIVE' },
    { firstName: 'Bob', lastName: 'Active', email: 'bob@example.com', status: 'ACTIVE' },
    { firstName: 'Charlie', lastName: 'Risk', email: 'charlie@example.com', status: 'ACTIVE' }, // At Risk
    { firstName: 'Dave', lastName: 'Risk', email: 'dave@example.com', status: 'ACTIVE' }, // At Risk
    { firstName: 'Eve', lastName: 'Cancelled', email: 'eve@example.com', status: 'CANCELLED' },
  ]

  const members = []
  for (const m of membersData) {
    const member = await prisma.member.create({
      data: {
        studioId: studio.id,
        ...m,
        joinDate: sixtyDaysAgo,
      },
    })
    members.push(member)
  }

  // 3. Create Classes (Daily for last 60 days)
  const classes = []
  for (let i = 0; i < 60; i++) {
    const date = new Date(sixtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000)
    // Morning Flow
    classes.push(await prisma.classSession.create({
      data: {
        studioId: studio.id,
        name: 'Morning Flow',
        startTime: new Date(date.setHours(8, 0, 0, 0)),
        instructor: 'Yogi Bear',
      },
    }))
    // Evening Chill
    classes.push(await prisma.classSession.create({
      data: {
        studioId: studio.id,
        name: 'Evening Chill',
        startTime: new Date(date.setHours(18, 0, 0, 0)),
        instructor: 'Bo Boo',
      },
    }))
  }

  // 4. Create Attendance
  // Strategies:
  // Alice & Bob: Consistent (e.g. every 2-3 days)
  // Charlie & Dave: Frequent first 30 days, then rare/stop last 30 days
  // Eve: Stopped long ago

  for (const member of members) {
    let attendancePattern: number[] = [] // list of day indices (0 to 59)

    if (member.lastName === 'Active') {
      // Every even day
      attendancePattern = Array.from({ length: 30 }, (_, i) => i * 2).map(x => x + (Math.random() > 0.5 ? 0 : 1)) // Randomize slightly
    } else if (member.lastName === 'Risk') {
      // First 30 days: Good (Every 2 days)
      const firstMonth = Array.from({ length: 15 }, (_, i) => i * 2)
      // Second 30 days: Bad (Only 1 or 2 visits)
      const secondMonth = [35, 55]
      attendancePattern = [...firstMonth, ...secondMonth]
    } else if (member.lastName === 'Cancelled') {
      const firstMonth = Array.from({ length: 5 }, (_, i) => i * 3) // Sparse
      attendancePattern = [...firstMonth]
    }

    for (const dayIndex of attendancePattern) {
      if (dayIndex >= 60) continue

      // Find a class on that day
      // We created 2 classes per day. 
      // 0,1 are day 0. 2,3 are day 1. => index * 2
      const classIndex = dayIndex * 2
      if (classes[classIndex]) {
        await prisma.attendance.create({
          data: {
            memberId: member.id,
            classSessionId: classes[classIndex].id,
            status: 'PRESENT'
          }
        })
        // Update last visit
        await prisma.member.update({
          where: { id: member.id },
          data: { lastVisitDate: classes[classIndex].startTime }
        })
      }
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
