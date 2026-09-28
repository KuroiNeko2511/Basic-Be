import catchAsync from '../utils/catchAsync.js';
import { sendSuccess } from '../utils/responseHelper.js';
import * as uploadService from '../service/upload.service.js';
import * as r2Service from '../service/r2.service.js';


export const uploadSingleFile = catchAsync(async (req, res) => {
  const result = uploadService.formatUploadedFile(req.file, req);
  return sendSuccess(res, 201, 'Upload file thành công', result);
});

// 1. Upload 1 ảnh lên R2 và Lưu DB
export const uploadImageToR2 = catchAsync(async (req, res) => {
  const userId = req.user.id;
  
  const result = await uploadService.processSingleCloudUpload(req.file, userId, 'images');

  return sendSuccess(res, 201, 'Upload ảnh lên R2 và lưu DB thành công', result);
});

// 2. Upload tối đa 5 tài liệu lên R2 và Lưu DB
export const uploadMultipleDocsToR2 = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const results = await uploadService.processMultipleCloudUpload(req.files, userId, 'documents');

  return sendSuccess(res, 201, `Đã upload thành công ${req.files.length} file và lưu DB`, results);
});

// 3. Lấy Presigned URL
export const getPresignedUrl = catchAsync(async (req, res) => {
  const { filename, mimetype } = req.body;
  if (!filename || !mimetype) {
    return res.status(400).json({ message: "Vui lòng truyền filename và mimetype" });
  }

  const result = await r2Service.generatePresignedUrl(filename, mimetype);
  return sendSuccess(res, 200, 'Tạo Presigned URL thành công', result);
});