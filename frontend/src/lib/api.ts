import { AuthResponse, StudentRecord, UserProfile } from "@/types";
import axios from 'axios';

// Simulate network delay for realism
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// =====================================
// === MOCKED DATABASE (SOURCE OF TRUTH)
// =====================================

let mockUsersDb: UserProfile[] = [
  { id: 'admin-01', name: 'Admin User', email: 'admin@test.com', role: 'admin', phone: '123-456-7890' },
  { id: 'student-01', name: 'Student User', email: 'student@test.com', role: 'student', phone: '098-765-4321', course: 'Computer Science', enrollmentYear: 2022 },
  { id: 's1', name: 'Alice Johnson', email: 'alice@test.com', role: 'student', phone: '111-222-3333', course: 'Web Development', enrollmentYear: 2023 },
  { id: 's2', name: 'Bob Williams', email: 'bob@test.com', role: 'student', phone: '444-555-6666', course: 'Data Science', enrollmentYear: 2022 },
  { id: 's3', name: 'Charlie Brown', email: 'charlie@test.com', role: 'student', phone: '777-888-9999', course: 'UX/UI Design', enrollmentYear: 2023 },
  { id: 's4', name: 'Diana Prince', email: 'diana@test.com', role: 'student', phone: '121-232-3434', course: 'Data Science', enrollmentYear: 2024 },
];

// ============================================
// === UTILITY FUNCTION: StudentRecord Mapping
// ============================================

const getStudentRecords = (): StudentRecord[] => {
  return mockUsersDb
    .filter(user => user.role === 'student')
    .map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      course: user.course || 'N/A',
      enrollmentYear: user.enrollmentYear || 0,
      status: (user.enrollmentYear && user.enrollmentYear < 2023) ? 'Graduated' : 'Active',
    }));
};

// ==============================
// === AUTHENTICATION
// ==============================

// === LOGIN USER

/**
 * Logs in a user by sending their credentials to the backend.
 * On success, returns a user profile and JWT token.
 */
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
      email,
      password,
    });

    const { user, token } = response.data;

    // Map backend's fullName to frontend's expected 'name'
    const formattedUser: UserProfile = {
      id: user.id,
      name: user.fullName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profilePicture: user.profilePicture,
      course: user.course,
      enrollmentYear: user.enrollmentYear,
      joinedAt: user.joinedAt || user.createdAt, // support both if needed
    };

    return { user: formattedUser, token };
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Login failed';
    throw new Error(message);
  }
};

// === REGISTER USER
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  course?: string;
}) => {
  try {
    const url = `${BASE_URL}/api/auth/register`;
    console.log("👉 Full Registration URL:", url); // 👈 print this!

    const res = await axios.post(url, {
      fullName: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      course: userData.course,
    }, {  
      withCredentials: true,
    });

    return res.data.user;
  } catch (error: any) {
    console.error("Registration error:", error); // 👈 log entire error
    throw new Error(
      error?.response?.data?.message || 'Registration failed. Please try again.'
    );
  }
};

// === THE USER

export const getUserProfile = async (token: string): Promise<UserProfile> => {
  await delay(300);
  const userId = token.replace('mock-jwt-for-', '');
  const user = mockUsersDb.find(u => u.id === userId);
  if (!user) throw new Error("User not found");
  return user;
};
export const updateUserProfile = async (
  userId: string,
  profileData: Partial<UserProfile>,
  token: string
): Promise<UserProfile> => {
  await delay(500);
  if (!token.includes('mock-jwt-for-')) throw new Error("Unauthorized access");

  const userIndex = mockUsersDb.findIndex(u => u.id === userId);
  if (userIndex === -1) throw new Error("User not found for update");

  Object.assign(mockUsersDb[userIndex], profileData);
  return mockUsersDb[userIndex];
};


// ==============================
// === STUDENT MANAGEMENT (ADMIN)
// ==============================

interface GetAllStudentsOptions {
  page?: number;
  limit?: number;
  statusFilter?: 'All' | 'Active' | 'Graduated' | 'Dropped';
}

export const getAllStudents = async (
  token: string,
  options: GetAllStudentsOptions = {}
): Promise<{ students: StudentRecord[]; total: number }> => {
  await delay(800);
  if (!token.includes('admin')) throw new Error("Unauthorized access");

  const { page = 1, limit = 5, statusFilter = 'All' } = options;
  let allStudents = getStudentRecords();

  if (statusFilter !== 'All') {
    allStudents = allStudents.filter(s => s.status === statusFilter);
  }

  const total = allStudents.length;
  const paginatedStudents = allStudents.slice((page - 1) * limit, page * limit);
  return { students: paginatedStudents, total };
};

export const createStudent = async (
  studentData: Omit<StudentRecord, 'id'>,
  token: string
): Promise<UserProfile> => {
  await delay(500);
  if (!token.includes('admin')) throw new Error("Unauthorized access");
  if (mockUsersDb.some(user => user.email === studentData.email)) {
    throw new Error('A student with this email already exists.');
  }

  const newUser: UserProfile = {
    id: `user-${Date.now()}`,
    name: studentData.name,
    email: studentData.email,
    role: 'student',
    course: studentData.course,
    enrollmentYear: studentData.enrollmentYear,
  };
  mockUsersDb.push(newUser);
  return newUser;
};

export const updateStudent = async (
  id: string,
  studentData: Partial<StudentRecord>,
  token: string
): Promise<UserProfile> => {
  await delay(500);
  if (!token.includes('admin')) throw new Error("Unauthorized access");

  const userIndex = mockUsersDb.findIndex(u => u.id === id);
  if (userIndex === -1) throw new Error("User not found for update");

  Object.assign(mockUsersDb[userIndex], studentData);
  return mockUsersDb[userIndex];
};

export const deleteStudent = async (id: string, token: string): Promise<void> => {
  await delay(500);
  if (!token.includes('admin')) throw new Error("Unauthorized access");
  mockUsersDb = mockUsersDb.filter(u => u.id !== id);
};

export const changeUserRole = async (
  userId: string,
  newRole: 'admin' | 'student',
  token: string
): Promise<UserProfile> => {
  await delay(500);
  if (!token.includes('admin')) throw new Error("Unauthorized access");

  const userIndex = mockUsersDb.findIndex(u => u.id === userId);
  if (userIndex === -1) throw new Error("User not found for role change");

  mockUsersDb[userIndex].role = newRole;
  return mockUsersDb[userIndex];
};

// ==============================
// === USER PROFILE & DASHBOARD
// ==============================

export const getAdminDashboardStats = async (
  token: string
): Promise<{ total: number; active: number; graduated: number }> => {
  await delay(400);
  if (!token.includes('admin')) throw new Error("Unauthorized access");

  const allStudents = getStudentRecords();
  return {
    total: allStudents.length,
    active: allStudents.filter(s => s.status === 'Active').length,
    graduated: allStudents.filter(s => s.status === 'Graduated').length,
  };
};

export const getMyProfile = async (accessToken: string): Promise<UserProfile> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const user = response.data;

  return {
    id: user.id,
    name: user.fullName, // Map fullName to name
    email: user.email,
    phone: user.phone,
    role: user.role,
    course: user.course,
    enrollmentYear: user.enrollmentYear,
    joinedAt: user.createdAt || user.joinedAt,
  };
};

export const updateMyProfile = async (
  profileData: Partial<UserProfile>,
  token: string
): Promise<UserProfile> => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, // Make sure this matches your backend route
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const user = response.data;

  return {
    id: user.id,
    name: user.fullName, // normalize backend field
    email: user.email,
    phone: user.phone,
    role: user.role,
    course: user.course,
    enrollmentYear: user.enrollmentYear,
    joinedAt: user.createdAt || user.joinedAt,
  };
};

