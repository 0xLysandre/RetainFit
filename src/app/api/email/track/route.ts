import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const event = url.searchParams.get('event') as string;
  const email = url.searchParams.get('email') as string;
  const linkUrl = url.searchParams.get('url') as string;
  
  if (!event || !email) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }
  
  // For open tracking, return 1x1 transparent pixel
  if (event === 'open') {
    const trackingPixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );
    
    return new NextResponse(trackingPixel, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
  
  // For click tracking, redirect to target URL
  if (event === 'click' && url) {
    // In a real implementation, you would log this to your database
    console.log(`Email click tracked: ${email} -> ${url}`);
    
    return NextResponse.redirect(url);
  }
  
  return NextResponse.json({ success: true });
}