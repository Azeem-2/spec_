'use client';

import { useState } from 'react';

interface UploadFormProps {
  onFileSelect: (file: File | null) => void;
  onUpload: () => void;
  isUploading: boolean;
}

export default function UploadForm({ onFileSelect, onUpload, isUploading }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setError('');

    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Please select a JPEG or PNG image file.');
        setSelectedFile(null);
        onFileSelect(null);
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB.');
        setSelectedFile(null);
        onFileSelect(null);
        return;
      }

      setSelectedFile(file);
      onFileSelect(file);
    } else {
      setSelectedFile(null);
      onFileSelect(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile && !error) {
      onUpload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
          Select Image (JPEG/PNG, max 10MB)
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          disabled={isUploading}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {selectedFile && (
        <div className="text-sm text-gray-600">
          Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!selectedFile || !!error || isUploading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isUploading ? 'Enhancing...' : 'Enhance Image'}
      </button>
    </form>
  );
}