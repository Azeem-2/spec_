# Image Enhancement Website

A web application that allows users to upload JPEG or PNG images and receive enhanced versions with improved quality, sharpness, brightness, and saturation.

## Features

- **Image Upload**: Drag and drop or click to select JPEG/PNG images
- **Quality Enhancement**: Automatic sharpening, brightness, and saturation adjustments
- **Real-time Progress**: Visual progress indicator during processing
- **Download Results**: Direct download of enhanced images
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **UI**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS
- **Image Processing**: Sharp 0.34.4
- **Build**: Turbopack for fast development

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd image-enhancer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Usage

1. **Upload an Image**: Click the upload area or drag and drop a JPEG/PNG file
2. **Wait for Processing**: The progress bar will show enhancement progress
3. **Download Result**: Click the download button to save the enhanced image

### File Requirements

- **Formats**: JPEG, PNG
- **Maximum Size**: 10MB per file
- **Processing Time**: Typically under 30 seconds

## API

### POST /api/enhance

Enhances an uploaded image.

**Request**: Multipart form data with `file` field containing the image.

**Response**: Enhanced image as binary data with appropriate Content-Type header.

**Error Responses**:
- `400`: Invalid file format or size
- `500`: Processing error

## Development

### Project Structure

```
src/
├── app/
│   ├── api/enhance/route.ts    # Image enhancement API
│   └── page.tsx                # Main application page
├── components/
│   ├── UploadForm.tsx          # File upload component
│   ├── ProgressBar.tsx         # Progress indicator
│   └── DownloadButton.tsx      # Download functionality
└── lib/
    └── imageProcessor.ts       # Image enhancement logic
```

### Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Principles

This project follows principles of:
- **Code Quality**: TypeScript for type safety, consistent code style
- **UX Consistency**: Responsive design, clear user feedback
- **Maintainable Architecture**: Modular components, separation of concerns
- **High Performance**: Fast image processing, optimized builds

## Contributing

1. Follow the established code style and architecture principles
2. Add tests for new features
3. Update documentation as needed
4. Ensure all linting passes

## License

This project is private and proprietary.
