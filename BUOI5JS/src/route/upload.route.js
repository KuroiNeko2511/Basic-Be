import { Router } from 'express';
import * as uploadController from '../controller/upload.controller.js';
import {
  uploadSingleImage,
  uploadSingleImageMemory,
  uploadMultipleDocsMemory,
} from '../middleware/upload.middleware.js';

const router = Router();

router.post('/file', uploadSingleImage('file'), uploadController.uploadSingleFile);
router.post('/image', uploadSingleImage('image'), uploadController.uploadSingleFile);
router.post('/avatar', uploadSingleImage('avatar'), uploadController.uploadSingleFile);

// 1. Route upload ảnh lên Cloudflare R2
router.post('/cloud/image', uploadSingleImageMemory('image'), uploadController.uploadImageToR2);

// 2. Route upload tối đa 5 file tài liệu lên Cloudflare R2
router.post('/cloud/documents', uploadMultipleDocsMemory('documents', 5), uploadController.uploadMultipleDocsToR2);

export default router;