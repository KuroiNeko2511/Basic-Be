-- Ví dụ chỉ thêm role nếu các cột khác đã có:
ALTER TABLE users ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'MEMBER';

-- Cập nhật tính năng tự đổi updated_at khi sửa dữ liệu:
ALTER TABLE users MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Thêm UNIQUE cho email (nếu lúc CREATE TABLE chưa thêm):
ALTER TABLE users ADD UNIQUE (email);