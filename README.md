# 🎓 Student Management System – Frontend

This is the **Frontend** of the Student Management System built with **Next.js (App Router)**, **Tailwind CSS**, **TypeScript**, and **NextAuth**. It supports both **admin** and **student** users, providing full authentication and role-based dashboards.

---

## 🚀 Features

- 🔐 **Authentication** with JWT using NextAuth (credentials provider)
- 📚 **Student Dashboard** with profile editing and course info
- 🧑‍💼 **Admin Dashboard** with statistics and student management
- 🔄 **Role-based access** (Admin vs. Student)
- 🌈 Responsive UI with Tailwind CSS
- 📦 Mocked backend support for development

---

## 🏗️ Tech Stack

| Tech               | Description                          |
|--------------------|--------------------------------------|
| Next.js            | React framework for SSR and routing  |
| TypeScript         | Static type checking                 |
| Tailwind CSS       | Utility-first CSS framework          |
| NextAuth.js        | Authentication with JWT              |
| Axios              | HTTP client                          |
| Lucide-react       | Icons                                |
| React Hot Toast    | Toast notification system            |

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── login/            # Login Page
│   ├── register/         # Registration Page
│   ├── profile/          # Student profile
│   ├── admin/            # Admin routes and dashboards
├── components/           # Reusable UI components
├── lib/                  # API logic (register, login, fetch users)
├── types/                # TypeScript types
├── styles/               # Tailwind CSS config
```

## 📦 Installation & Usage

### 1. Clone the repository

```bash
git clone https://github.com/your-username/student-management-system-frontend.git
cd student-management-system-frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create your environment file

Create a .env.local file in the root directory and add:

```bash
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

```

## 4. Run the development server

```bash
npm run dev

```

## 🧑‍💻 Login Credentials (Mocked Users)

### - Admin
- Email: admin@test.com  
- Password: any

### - Student
- Email: student@test.com  
- Password: any

- Or register a new account as a student.


## 📬 API Endpoints Used
This frontend expects the following endpoints from the backend:

# 📬 API Endpoints Used

Method: POST  
Endpoint: /api/auth/register  
Description: Register a new user

--

Method: POST  
Endpoint: /api/auth/login  
Description: Login and return JWT

--

Method: GET  
Endpoint: /api/auth/me  
Description: Get current user profile

--

Method: PUT  
Endpoint: /api/users/me  
Description: Update current user profile

--

Method: GET  
Endpoint: /api/students  
Description: List students (admin only)

--

Method: POST  
Endpoint: /api/students  
Description: Add new student (admin only)

--

Method: PUT  
Endpoint: /api/students/:id  
Description: Update a student (admin only)

--

Method: DELETE  
Endpoint: /api/students/:id  
Description: Delete a student (admin only)

--

Method: PATCH  
Endpoint: /api/users/:id/role  
Description: Change user role (admin only)


## 📄 License
MIT License. See LICENSE for details.

--

## 🙋‍♂️ Author
UMUHIRE Germaine

### Email: ### jeandedh@andrew.cmu.edu

