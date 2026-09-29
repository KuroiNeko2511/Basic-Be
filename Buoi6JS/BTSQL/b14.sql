USE test; 

CREATE TABLE IF NOT EXISTS cloud_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(100),
    file_size INT,
    user_id INT, -- Thêm cột user_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Khóa ngoại liên kết với cột id của bảng users
    CONSTRAINT fk_cloud_files_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);