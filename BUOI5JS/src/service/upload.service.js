import * as r2Service from './r2.service.js';
import * as fileRepository from '../repository/file.repository.js';

export const processSingleCloudUpload = async (file, userId, folderName) => {
  // 1. Đẩy file lên Cloudflare R2
  const uploadResult = await r2Service.uploadBufferToR2(
    file.buffer,
    file.originalname,
    file.mimetype,
    folderName
  );

  // 2. Lưu vào Database thông qua Repository
  const fileData = {
    fileName: file.originalname,
    fileUrl: uploadResult.url,
    fileType: file.mimetype,
    fileSize: file.size,
    userId: userId,
  };
  const dbResult = await fileRepository.saveCloudFile(fileData);

  return {
    id: dbResult.insertId,
    ...fileData,
  };
};

export const processMultipleCloudUpload = async (files, userId, folderName) => {
  // 1. Đẩy đồng loạt lên R2
  const uploadPromises = files.map(file => 
    r2Service.uploadBufferToR2(file.buffer, file.originalname, file.mimetype, folderName)
  );
  const r2Results = await Promise.all(uploadPromises);

  // 2. Lưu đồng loạt vào Database
  const insertPromises = r2Results.map((result, index) => {
    const file = files[index];
    const fileData = {
      fileName: file.originalname,
      fileUrl: result.url,
      fileType: file.mimetype,
      fileSize: file.size,
      userId: userId,
    };
    return fileRepository.saveCloudFile(fileData).then(() => fileData);
  });

  const savedFiles = await Promise.all(insertPromises);
  return savedFiles;
};