import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from '../controllers/studentController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect, authorize('admin'));

router.route('/')
  .post(createStudent)
  .get(getStudents);

router.route('/:id')
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent);

export default router;
