import { NextRequest, NextResponse } from 'next/server';
import { enhanceImage, validateImageFile } from '@/lib/imageProcessor';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process image
    const result = await enhanceImage(buffer);

    // Return enhanced image
    const response = new Response(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        'Content-Type': result.format,
        'Content-Disposition': `attachment; filename="enhanced-${file.name}"`,
        'Content-Length': result.size.toString(),
      },
    });

    return response;
  } catch (error) {
    console.error('Enhancement error:', error);
    return NextResponse.json(
      { error: 'Image enhancement failed' },
      { status: 500 }
    );
  }
}