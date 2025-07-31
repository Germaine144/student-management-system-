import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const updateMe = asyncHandler(async (req, res) => {
  const { fullName, phone, course, profilePicture, enrollmentYear } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Update only allowed fields
  user.fullName = fullName || user.fullName;
  user.phone = phone || user.phone;
  user.course = course || user.course;
  user.profilePicture = profilePicture || user.profilePicture;
  user.enrollmentYear = enrollmentYear || user.enrollmentYear;

  const updated = await user.save();

  res.json({
    id: updated._id,
    fullName: updated.fullName,
    email: updated.email,
    role: updated.role,
    phone: updated.phone,
    course: updated.course,
    profilePicture: updated.profilePicture,
    enrollmentYear: updated.enrollmentYear,
    createdAt: updated.createdAt,
  });
});

export const changeRole = asyncHandler(async (req, res) => {
  const { role } = req.body; // 'admin' | 'student'
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.role = role;
  await user.save();
  res.json({ message: 'Role updated', user: { id: user._id, email: user.email, role: user.role } });
});
