import { prisma } from './db'
import { sendEmail } from './email'
import WelcomeEmail from '@/components/emails/WelcomeEmail'

/**
 * Calculates risk score for a single member based on attendance history.
 * ... (same heuristics)
 */
export async function calculateMemberRisk(memberId: string): Promise<number> {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Fetch attendance
    const attendance = await prisma.attendance.findMany({
        where: {
            memberId: memberId,
            status: 'PRESENT',
            classSession: {
                startTime: {
                    gte: sixtyDaysAgo
                }
            }
        },
        include: {
            classSession: true
        }
    });

    let score = 0;

    // Split into periods
    const currentPeriodVisits = attendance.filter((a: any) => a.classSession.startTime >= thirtyDaysAgo).length;
    const previousPeriodVisits = attendance.filter((a: any) => a.classSession.startTime >= sixtyDaysAgo && a.classSession.startTime < thirtyDaysAgo).length;

    // Heuristic 1: Drop-off
    if (previousPeriodVisits > 0) {
        const ratio = currentPeriodVisits / previousPeriodVisits;
        if (ratio < 0.5) {
            score += 50; // Severe drop
        } else if (ratio < 0.75) {
            score += 25; // Moderate drop
        }
    }

    // Heuristic 2: Recent absence
    const lastVisit = attendance.sort((a: any, b: any) => b.classSession.startTime.getTime() - a.classSession.startTime.getTime())[0];

    if (!lastVisit || lastVisit.classSession.startTime < fourteenDaysAgo) {
        score += 40; // No visit in 2 weeks
    }

    // Cap at 100
    return Math.min(score, 100);
}

/**
 * Batch updates all members for a studio.
 */
export async function updateStudioRiskRen(studioId?: string) {
    const members = await prisma.member.findMany({
        where: {
            status: 'ACTIVE',
            ...(studioId ? { studioId } : {})
        }
    });

    let updatedCount = 0;

    for (const member of members) {
        const riskScore = await calculateMemberRisk(member.id);

        await prisma.member.update({
            where: { id: member.id },
            data: { riskScore }
        });
        updatedCount++;
    }

    return updatedCount;
}

/**
 * AUTOMATION: Analyzes ALL studios and triggers emails
 */
export async function analyzeAllStudios() {
    console.log("Starting global churn analysis...");
    const members = await prisma.member.findMany({
        where: { status: 'ACTIVE' },
        include: { studio: true }
    });

    let emailsSent = 0;
    let updatedMembers = 0;

    for (const member of members) {
        const riskScore = await calculateMemberRisk(member.id);

        await prisma.member.update({
            where: { id: member.id },
            data: { riskScore }
        });
        updatedMembers++;

        // Trigger Win-back Email if High Risk (> 75)
        if (riskScore > 75) {
            // Check if we already sent one recently (omitted for MVP simplicity, would be in CampaignLog)
            try {
                await sendEmail({
                    to: member.email,
                    subject: `We miss you at ${member.studio.name}!`,
                    react: WelcomeEmail({
                        memberName: member.firstName,
                        studioName: member.studio.name,
                        dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
                        memberEmail: member.email
                    })
                });
                emailsSent++;
            } catch (e) {
                console.error("Failed to send winback email", e);
            }
        }
    }

    return { updatedMembers, emailsSent };
}
