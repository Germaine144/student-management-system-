import Student from '../models/Student.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createStudent = asyncHandler(async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

export const getStudents = asyncHandler(async (req, res) => {
  const { course, status, page = 1, limit = 10 } = req.query;
  const query = {};
  if (course) query.course = course;
  if (status) query.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [students, total] = await Promise.all([
    Student.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
    Student.countDocuments(query),
  ]);

  res.json({
    data: students,
    meta: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) },
  });
});

export const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

export const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json({ message: 'Student removed' });
});
