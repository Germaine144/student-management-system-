import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Student from '../models/Student.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Student.deleteMany();

    const passwordHash = await bcrypt.hash('Password@123', 10);

    const admin = await User.create({
      fullName: 'Admin User',
      email: 'admin@example.com',
      phone: '+250788000000',
      role: 'admin',
      password: passwordHash,
    });

    const student1 = await User.create({
      fullName: 'Student One',
      email: 'student1@example.com',
      phone: '+250788000001',
      role: 'student',
      course: 'Computer Science',
      password: passwordHash,
    });

    const student2 = await User.create({
      fullName: 'Student Two',
      email: 'student2@example.com',
      phone: '+250788000002',
      role: 'student',
      course: 'Software Engineering',
      password: passwordHash,
    });

    await Student.insertMany([
      {
        name: 'Student One',
        email: 'student1@example.com',
        course: 'Computer Science',
        enrollmentYear: 2023,
        status: 'Active',
      },
      {
        name: 'Student Two',
        email: 'student2@example.com',
        course: 'Software Engineering',
        enrollmentYear: 2022,
        status: 'Active',
      },
    ]);

    console.log('Seed data inserted. Admin login: admin@example.com / Password@123');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
