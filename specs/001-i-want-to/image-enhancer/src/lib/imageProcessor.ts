import sharp from 'sharp';

export interface ImageProcessingResult {
  buffer: Buffer;
  format: string;
  size: number;
}

export async function enhanceImage(inputBuffer: Buffer): Promise<ImageProcessingResult> {
  try {
    // Enhance image with basic improvements
    const enhancedBuffer = await sharp(inputBuffer)
      .sharpen({
        sigma: 1.5,
      })
      .modulate({
        brightness: 1.1,
        saturation: 1.2,
      })
      .jpeg({
        quality: 90,
        mozjpeg: true,
      })
      .toBuffer();

    return {
      buffer: enhancedBuffer,
      format: 'image/jpeg',
      size: enhancedBuffer.length,
    };
  } catch (error) {
    throw new Error(`Image enhancement failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  // Check file type
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    return { isValid: false, error: 'File must be JPEG or PNG' };
  }

  // Check file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    return { isValid: false, error: 'File size must be less than 10MB' };
  }

  return { isValid: true };
}