import { Router } from 'express';
import { changeRole, updateMe } from '../controllers/userController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = Router();

// Logged-in user updates their own profile
router.put('/me', protect, updateMe);

// Admin changes someone else’s role
router.patch('/:id/role', protect, authorize('admin'), changeRole);

export default router;
