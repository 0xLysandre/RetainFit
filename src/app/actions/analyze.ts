'use server'

import { updateStudioRiskRen } from "@/lib/churn";
import { revalidatePath } from "next/cache";

export async function runChurnAnalysisAction() {
    try {
        const count = await updateStudioRiskRen();
        revalidatePath('/dashboard');
        return { success: true, count };
    } catch (error) {
        console.error('Churn analysis failed:', error);
        return { success: false, error: 'Failed to run analysis' };
    }
}
