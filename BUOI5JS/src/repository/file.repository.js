import pool from '../config/db.config.js'; // Đường dẫn kết nối db của bạn

export const saveCloudFile = async (fileData) => {
  const { fileName, fileUrl, fileType, fileSize, userId } = fileData;
  const [result] = await pool.execute(
    'INSERT INTO cloud_files (file_name, file_url, file_type, file_size, user_id) VALUES (?, ?, ?, ?, ?)',
    [fileName, fileUrl, fileType, fileSize, userId]
  );
  return result;
};