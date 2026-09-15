-- 1. Bảng Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'MEMBER' CHECK (role IN ('ADMIN', 'MEMBER')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Classes
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    mentor_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_classes_mentor FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE RESTRICT
);
CREATE INDEX idx_classes_mentor_id ON classes(mentor_id);

-- 3. Bảng ClassMember
CREATE TABLE class_members (
    id SERIAL PRIMARY KEY,
    class_id INT NOT NULL,
    member_id INT NOT NULL,
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_class_member UNIQUE (class_id, member_id),
    CONSTRAINT fk_cm_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_cm_member FOREIGN KEY (member_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_class_members_member_id ON class_members(member_id);

-- 4. Bảng Lessons
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    class_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    order_index INT NOT NULL DEFAULT 1,
    created_by INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_lesson_class_order UNIQUE (class_id, order_index),
    CONSTRAINT fk_lessons_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_lessons_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
);
CREATE INDEX idx_lessons_class_id ON lessons(class_id);

-- 5. Bảng LessonProgress
CREATE TABLE lesson_progress (
    id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL,
    member_id INT NOT NULL,
    completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_lesson_member_progress UNIQUE (lesson_id, member_id),
    CONSTRAINT fk_lp_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    CONSTRAINT fk_lp_member FOREIGN KEY (member_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_lesson_progress_member_id ON lesson_progress(member_id);

-- 6. Bảng Assignments
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    class_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    deadline TIMESTAMP,
    maximum_score NUMERIC(5, 2) NOT NULL DEFAULT 10.00,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_assignments_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);
CREATE INDEX idx_assignments_class_id ON assignments(class_id);

-- 7. Bảng Submissions
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    assignment_id INT NOT NULL,
    member_id INT NOT NULL,
    content TEXT,
    repository_url VARCHAR(500),
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    score NUMERIC(5, 2),
    feedback TEXT,
    reviewed_at TIMESTAMP,
    reviewed_by INT,
    CONSTRAINT uq_assignment_member_submission UNIQUE (assignment_id, member_id),
    CONSTRAINT fk_submissions_assignment FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    CONSTRAINT fk_submissions_member FOREIGN KEY (member_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_submissions_reviewer FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX idx_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX idx_submissions_member_id ON submissions(member_id);