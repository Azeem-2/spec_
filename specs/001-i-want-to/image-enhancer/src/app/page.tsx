'use client';

import { useState } from 'react';
import UploadForm from '@/components/UploadForm';
import ProgressBar from '@/components/ProgressBar';
import DownloadButton from '@/components/DownloadButton';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [filename, setFilename] = useState('');
  const [error, setError] = useState('');

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setDownloadUrl(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/enhance', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Enhancement failed');
      }

      setProgress(100);

      // Create download URL
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setFilename(`enhanced-${selectedFile.name}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Image Enhancement
          </h1>
          <p className="text-gray-600">
            Upload a JPEG or PNG image to enhance its quality
          </p>
        </div>

        <UploadForm
          onFileSelect={handleFileSelect}
          onUpload={handleUpload}
          isUploading={isUploading}
        />

        <div className="mt-6">
          <ProgressBar
            progress={progress}
            isVisible={isUploading}
          />
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mt-6">
          <DownloadButton
            downloadUrl={downloadUrl}
            filename={filename}
            isVisible={!!downloadUrl}
          />
        </div>
      </div>
    </div>
  );
}
