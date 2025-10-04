'use client';

interface ProgressBarProps {
  progress: number; // 0-100
  isVisible: boolean;
}

export default function ProgressBar({ progress, isVisible }: ProgressBarProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="text-center text-sm text-gray-600 mt-1">
        {progress}% complete
      </div>
    </div>
  );
}