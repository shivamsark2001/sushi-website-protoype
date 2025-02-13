import { NextResponse } from 'next/server';

// Disable Next.js's default body parser so we can parse multipart data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    // Extract the access code from the query string
    const { searchParams } = new URL(request.url);
    const accessCode = searchParams.get('accessCode');

    // Compare to an env variable you define in Vercel
    if (accessCode !== process.env.ACCESS_CODE) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Simulate "GPU processing" delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Convert the file to a base64 data URL
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type || 'image/png'; // fallback if type is missing
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({
      enhancedImageUrl: dataUrl,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}
