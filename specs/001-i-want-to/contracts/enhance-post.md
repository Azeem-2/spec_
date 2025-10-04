# Contract: POST /api/enhance

## Endpoint
`POST /api/enhance`

## Purpose
Accept image file upload, process enhancement, return enhanced image

## Request
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**:
  - `file`: File field containing image (JPEG/PNG, <10MB)

## Response (Success)
- **Status**: 200 OK
- **Content-Type**: application/octet-stream or image/jpeg|png
- **Headers**:
  - `Content-Disposition`: attachment; filename="enhanced-{originalName}"
- **Body**: Binary data of enhanced image

## Response (Validation Error)
- **Status**: 400 Bad Request
- **Content-Type**: application/json
- **Body**:
  ```json
  {
    "error": "Invalid file",
    "message": "File must be JPEG or PNG under 10MB"
  }
  ```

## Response (Processing Error)
- **Status**: 500 Internal Server Error
- **Content-Type**: application/json
- **Body**:
  ```json
  {
    "error": "Processing failed",
    "message": "Image enhancement failed"
  }
  ```

## Validation Rules
- File presence required
- MIME type: image/jpeg or image/png
- Size: <= 10,000,000 bytes
- Processing timeout: <30 seconds

## Test Cases
- Valid JPEG upload → 200 with enhanced image
- Valid PNG upload → 200 with enhanced image
- No file → 400
- Invalid format → 400
- Oversized file → 400
- Corrupted image → 500