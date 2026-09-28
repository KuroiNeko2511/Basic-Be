import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import { config } from "../config/env.config.js";

// Khởi tạo S3 Client kết nối đến Cloudflare R2
const s3Client = new S3Client({
  region: "auto",
  endpoint: config.r2.endpoint,
  credentials: {
    accessKeyId: config.r2.accessKeyId,
    secretAccessKey: config.r2.secretAccessKey,
  },
});

/**
 * Upload file từ memory (Buffer) lên Cloudflare R2
 * @param {Buffer} fileBuffer - Buffer dữ liệu từ req.file.buffer
 * @param {string} originalname - Tên file gốc của người dùng
 * @param {string} mimetype - Loại file (image/png, application/pdf,...)
 * @param {string} folder - Thư mục phân loại trên R2 ('images' hoặc 'documents')
 */
export const uploadBufferToR2 = async (fileBuffer, originalname, mimetype, folder = "uploads") => {
  const ext = path.extname(originalname).toLowerCase();
  const fileName = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

  const command = new PutObjectCommand({
    Bucket: config.r2.bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
  });

  await s3Client.send(command);

  // Chuẩn hóa domain không để thừa dấu / ở cuối
  const domain = config.r2.publicDomain.replace(/\/+$/, "");
  const publicUrl = `${domain}/${fileName}`;

  return {
    key: fileName,
    url: publicUrl,
  };
};