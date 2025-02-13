import { NextResponse } from 'next/server';

// Disable Next.js's default body parser so we can parse multipart data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    // For demo purposes, simulate processing with a 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({
      enhancedImageUrl: 'https://via.placeholder.com/256?text=Enhanced',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}
