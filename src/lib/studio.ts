import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

/**
 * Retrieves the database Studio record associated with the currently authenticated Clerk Organization.
 * If the Studio does not exist in the database (first-time access), it is automatically created.
 */
export async function getCurrentStudio() {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        redirect('/sign-in');
    }

    // Try to find existing studio
    const studio = await prisma.studio.findUnique({
        where: { clerkOrgId: orgId }
    });

    if (studio) {
        return studio;
    }

    // Provision new studio if not found
    const client = await clerkClient();
    let orgName = "New Studio";

    try {
        const org = await client.organizations.getOrganization({ organizationId: orgId });
        orgName = org.name;
    } catch (error) {
        console.error("Failed to fetch Clerk Org details", error);
    }

    const newStudio = await prisma.studio.create({
        data: {
            name: orgName,
            clerkOrgId: orgId
        }
    });

    return newStudio;
}
