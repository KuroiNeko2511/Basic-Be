import { Router } from 'express';
import * as uploadController from '../controller/upload.controller.js';
import {
  uploadSingleImageMemory,
  uploadMultipleDocsMemory,
} from '../middleware/upload.middleware.js';
import { authenticateToken } from '../middleware/auth.middleware.js'; // Import hàm của bạn
const router = Router();

// Endpoint upload 1 ảnh
router.post(
  '/cloud/image',
  authenticateToken, 
  uploadSingleImageMemory('image'), 
  uploadController.uploadImageToR2
);

// Endpoint upload tối đa 5 tài liệu
router.post(
  '/cloud/documents', 
  authenticateToken,
  uploadMultipleDocsMemory('documents', 5), 
  uploadController.uploadMultipleDocsToR2
);

// Endpoint lấy link Presigned (Optional)
router.post(
  '/cloud/presigned-url', 
  authenticateToken,
  uploadController.getPresignedUrl
);
export default router;