# Data Model: Image Enhancement Website

## Image Entity

**Purpose**: Represents user-uploaded images and their enhanced versions

**Attributes**:
- `id`: Unique identifier (UUID or timestamp-based)
- `originalName`: Original filename from upload
- `size`: File size in bytes (must be <10MB)
- `format`: Image format (JPEG or PNG)
- `originalBuffer`: Binary data of uploaded image
- `enhancedBuffer`: Binary data of processed image (after enhancement)
- `processingStatus`: Enum (pending, processing, completed, failed)
- `errorMessage`: Optional error description if processing fails
- `createdAt`: Timestamp of upload
- `processedAt`: Timestamp of completion

**Constraints**:
- Size <= 10,000,000 bytes
- Format in ['image/jpeg', 'image/png']
- Buffers stored temporarily in memory during processing

**Lifecycle**:
1. Upload: Create with original data, status = pending
2. Processing: Update status to processing
3. Completion: Update with enhanced data, status = completed
4. Error: Update status = failed, add errorMessage
5. Cleanup: Remove buffers after response sent

**Relationships**: None (single-entity system)

**Storage**: In-memory during request lifecycle, no persistence required