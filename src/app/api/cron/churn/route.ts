import { analyzeAllStudios } from "@/lib/churn";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Security Check
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const results = await analyzeAllStudios();
        return NextResponse.json({ success: true, ...results });
    } catch (error) {
        console.error("Cron Job Failed:", error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
