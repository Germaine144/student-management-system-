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

Create a **.env.local** file in the root directory and add:

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
- **Email:** admin@test.com  
- **Password:** any

### - Student
- **Email:** student@test.com  
- **Password:** any

- Or register a new account as a student.


## 📬 API Endpoints Used
This frontend expects the following endpoints from the backend:

# 📬 API Endpoints Used

| Method | Endpoint              | Description                   |
|--------|-----------------------|-------------------------------|
| POST   | /api/auth/register    | Register a new user           |
| POST   | /api/auth/login       | Login and return JWT          |
| GET    | /api/auth/me          | Get current user profile      |
| PUT    | /api/users/me         | Update current user profile   |
| GET    | /api/students         | List students (admin only)    |
| POST   | /api/students         | Add new student (admin only)  |
| PUT    | /api/students/:id     | Update a student (admin only) |
| DELETE | /api/students/:id     | Delete a student (admin only) |
| PATCH  | /api/users/:id/role   | Change user role (admin only) |


## 📄 License
MIT License. See LICENSE for details.

--

## 🙋‍♂️ Author
UMUHIRE Germaine

### Email: umuhiregermaine12@gmail.com

