import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const updateMe = asyncHandler(async (req, res) => {
  const { fullName, phone, course, profilePicture } = req.body;

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { fullName, phone, course, profilePicture },
    { new: true }
  ).select('-password');

  res.json(updated);
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
