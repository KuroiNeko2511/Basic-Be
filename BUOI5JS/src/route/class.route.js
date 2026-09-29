import { Router } from 'express';
import * as classController from '../controller/class.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizeAdmin } from '../middleware/role.middleware.js';

const router = Router();

// Áp dụng: Tất cả user đã đăng nhập.
router.get('/', authenticateToken, classController.getClasses);

// Áp dụng: Yêu cầu đăng nhập (authenticateToken) VÀ bắt buộc phải là Admin (authorizeAdmin)
router.post('/', authenticateToken, authorizeAdmin, classController.createClass);

export default router;