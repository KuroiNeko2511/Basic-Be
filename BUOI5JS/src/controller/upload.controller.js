import catchAsync from '../utils/catchAsync.js';
import { sendSuccess } from '../utils/responseHelper.js';
import * as uploadService from '../service/upload.service.js';
import * as r2Service from '../service/r2.service.js';


export const uploadSingleFile = catchAsync(async (req, res) => {
  const result = uploadService.formatUploadedFile(req.file, req);
  return sendSuccess(res, 201, 'Upload file thành công', result);
});

// 1. Controller Upload 1 ảnh lên Cloudflare R2
export const uploadImageToR2 = catchAsync(async (req, res) => {
  const uploadResult = await r2Service.uploadBufferToR2(
    req.file.buffer,
    req.file.originalname,
    req.file.mimetype,
    'images'
  );

  return sendSuccess(res, 201, 'Upload ảnh lên Cloudflare R2 thành công', {
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    url: uploadResult.url, // URL HTTPS công khai
  });
});

// 2. Controller Upload tối đa 5 file tài liệu cùng lúc lên Cloudflare R2
export const uploadMultipleDocsToR2 = catchAsync(async (req, res) => {
  const uploadPromises = req.files.map((file) =>
    r2Service.uploadBufferToR2(file.buffer, file.originalname, file.mimetype, 'documents')
  );

  const results = await Promise.all(uploadPromises);

  const responseData = results.map((result, index) => ({
    originalName: req.files[index].originalname,
    mimetype: req.files[index].mimetype,
    size: req.files[index].size,
    url: result.url,
  }));

  return sendSuccess(res, 201, `Đã upload thành công ${req.files.length} tài liệu lên Cloudflare R2`, responseData);
});