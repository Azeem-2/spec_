'use client';

interface DownloadButtonProps {
  downloadUrl: string | null;
  filename: string;
  isVisible: boolean;
}

export default function DownloadButton({ downloadUrl, filename, isVisible }: DownloadButtonProps) {
  if (!isVisible || !downloadUrl) return null;

  return (
    <div className="text-center">
      <a
        href={downloadUrl}
        download={filename}
        className="inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
      >
        Download Enhanced Image
      </a>
    </div>
  );
}