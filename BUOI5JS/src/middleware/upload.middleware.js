import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { BadRequestError } from '../core/error.response.js';

// ==================== CẤU HÌNH LOCAL DISK STORAGE ====================
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError('Định dạng file không hợp lệ! Chỉ chấp nhận ảnh (jpeg, jpg, png, webp, gif).'), false);
  }
};

export const multerUpload = multer({
  storage: diskStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: imageFileFilter,
});

export const uploadSingleImage = (fieldName = 'file', required = true) => {
  return (req, res, next) => {
    const upload = multerUpload.single(fieldName);
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new BadRequestError('Kích thước file vượt quá giới hạn cho phép (Tối đa 2MB)!'));
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return next(new BadRequestError(`Field name không đúng quy định! Vui lòng đặt tên key là '${fieldName}'.`));
        }
        return next(new BadRequestError(`Lỗi upload file: ${err.message}`));
      }
      if (err) return next(err);
      if (required && !req.file) {
        return next(new BadRequestError(`Vui lòng chọn một file để tải lên (key: '${fieldName}')!`));
      }
      next();
    });
  };
};

// ==================== CẤU HÌNH CLOUD MEMORY STORAGE ====================
const memoryStorage = multer.memoryStorage();

// Middleware upload 1 ảnh lên Cloudflare R2
export const uploadSingleImageMemory = (fieldName = 'image') => {
  const upload = multer({
    storage: memoryStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Tối đa 5MB
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new BadRequestError('Chỉ chấp nhận file định dạng ảnh (jpeg, jpg, png, webp, gif)!'), false);
      }
    },
  }).single(fieldName);

  return (req, res, next) => {
    upload(req, res, (err) => {
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
      if (err) return next(new BadRequestError(err.message));
      if (!req.files || req.files.length === 0) {
        return next(new BadRequestError(`Vui lòng chọn ít nhất 1 tài liệu (key: '${fieldName}')`));
      }
      next();
    });
  };
};