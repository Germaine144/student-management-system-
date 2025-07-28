import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: String },
    enrollmentYear: { type: Number },
    status: { type: String, enum: ['Active', 'Graduated', 'Dropped'], default: 'Active' },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;
