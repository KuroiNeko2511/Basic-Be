import multer from 'multer';
import { BadRequestError } from '../core/error.response.js';

// Khởi tạo memoryStorage để lưu tạm file vào RAM dưới dạng buffer trước khi đẩy lên R2
const memoryStorage = multer.memoryStorage();

// Middleware upload 1 ảnh lên Cloudflare R2
export const uploadSingleImageMemory = (fieldName = 'image') => {
  const upload = multer({
    storage: memoryStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Tối đa 5MB
    fileFilter: (req, file, cb) => {
      // Chỉ chấp nhận định dạng ảnh
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new BadRequestError('Chỉ chấp nhận file định dạng ảnh (jpeg, jpg, png, webp, gif)!'), false);
      }
    },
  }).single(fieldName);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new BadRequestError('Kích thước ảnh vượt quá giới hạn (Tối đa 5MB)!'));
        }
        return next(new BadRequestError(`Lỗi cấu hình field name: ${err.message}`));
      }
      if (err) return next(new BadRequestError(err.message));
      if (!req.file) {
        return next(new BadRequestError(`Vui lòng chọn file ảnh để tải lên (key: '${fieldName}')`));
      }
      next();
    });
  };
};

// Middleware upload tối đa 5 file tài liệu lên Cloudflare R2
export const uploadMultipleDocsMemory = (fieldName = 'documents', maxCount = 5) => {
  const allowedDocMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'application/x-zip-compressed',
    'text/plain',
    'image/png'
  ];

  const upload = multer({
    storage: memoryStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Tối đa 10MB/file
    fileFilter: (req, file, cb) => {
      if (allowedDocMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new BadRequestError(`File '${file.originalname}' không đúng định dạng tài liệu được hỗ trợ!`), false);
      }
    },
  }).array(fieldName, maxCount);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new BadRequestError('Kích thước tài liệu vượt quá giới hạn (Tối đa 10MB/file)!'));
        }
        return next(new BadRequestError(`Lỗi cấu hình field name: ${err.message}`));
      }
      if (err) return next(new BadRequestError(err.message));
      if (!req.files || req.files.length === 0) {
        return next(new BadRequestError(`Vui lòng chọn ít nhất 1 tài liệu (key: '${fieldName}')`));
      }
      next();
    });
  };
};