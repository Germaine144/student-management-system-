# 🎓 Student Management System – Frontend

This is the **Frontend** of the Student Management System built with **Next.js (App Router)**, **Tailwind CSS**, **TypeScript**, and **NextAuth**. It supports both **admin** and **student** users, providing full authentication and role-based dashboards.

---
<img width="1512" height="982" alt="Screenshot 2025-07-31 at 21 55 14" src="https://github.com/user-attachments/assets/142cef4f-86a3-4dca-b33e-58793ff4ff20" />


## 🚀 Features

- 🔐 **Authentication** with JWT using NextAuth (credentials provider)
- 📚 **Student Dashboard** with profile editing and course info
- 🧑‍💼 **Admin Dashboard** with statistics and student management
- 🔄 **Role-based access** (Admin vs. Student)
- 🌈 Responsive UI with Tailwind CSS
- 📦 Mocked backend support for development

<img width="1512" height="982" alt="Screenshot 2025-07-31 at 22 04 14" src="https://github.com/user-attachments/assets/32022a19-2b24-486d-9416-5812ee9d0d2d" />
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

<img width="1512" height="982" alt="Screenshot 2025-07-31 at 21 55 21" src="https://github.com/user-attachments/assets/fca61c26-7bb6-4613-93ea-98c9d585d57b" />
--
<img width="1512" height="982" alt="Screenshot 2025-07-31 at 21 55 29" src="https://github.com/user-attachments/assets/94335178-c8c4-44a1-9cf9-aa1050abb83c" />


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

--

# 🛠️ Student Management System – Backend

Backend server for the Student Management System using Node.js, Express, and MongoDB.

\--

## 📆 Features

* JWT authentication and role-based authorization
* CRUD for student records (admin only)
* Profile editing for logged-in users
* API routes for login, registration, and user management
* Seed script to insert initial admin and student data

\--

## 📆 Technologies Used

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT for auth
* Bcrypt for password hashing
* dotenv for environment config
* Helmet, CORS, Rate Limit for security

\--

## 📁 Folder Structure

* `controllers/` – Auth, user, student logic
* `models/` – Mongoose schemas
* `routes/` – Express route handlers
* `middlewares/` – Error and auth handlers
* `config/` – DB connection
* `seeder/` – Initial data script
* `server.js` – App entry point

\--

## 📅 Setup Instructions

### - 1. Clone the repository

```bash
git clone https://github.com/your-username/student-management-system-backend.git
cd student-management-system-backend
```

### - 2. Install dependencies

```bash
npm install
```

### - 3. Create an environment file

Create a `.env` file in the root directory and add:

```
PORT=5001
NODE_ENV=development

# MongoDB
MONGO_URI=your-mongodb-uri

# JWT
JWT_SECRET=superSecretStudentSystem2025
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7d

# Admin Secret
ADMIN_SECRET=secret2025

# CORS
NEXT_PUBLIC_API_URL=http://localhost:5000
```

\--

## ▶️ Running the Server

```bash
npm run dev
```

Go to: [http://localhost:5001](http://localhost:5001)

\--

## 🌐 API Endpoints

```
Method   | Endpoint               | Description
-------- | ---------------------- | --------------------------------------------
POST     | /api/auth/register     | Register new user (admin/student)
POST     | /api/auth/login        | Login with credentials
GET      | /api/auth/me           | Get current user profile (auth)
PUT      | /api/users/me          | Update logged-in user's profile
PATCH    | /api/users/:id/role    | Change user role (admin only)
GET      | /api/students          | Get paginated students (admin only)
POST     | /api/students          | Create a student (admin only)
GET      | /api/students/:id      | Get single student (admin only)
PUT      | /api/students/:id      | Update student info (admin only)
DELETE   | /api/students/:id      | Delete student (admin only)
GET      | /health                | Health check
```

\--

## 🔐 Authentication & Authorization

* JWT-based authentication using `Authorization: Bearer <token>`
* Role-based access: `admin` and `student`
* To register an admin, include this header:

```
x-admin-secret: secret2025
```

\--

## 🧩️ Seed Data Script

To populate the database with initial users and students:

```bash
node backend/seeder/index.js
```

This will:

* Create 1 admin and 2 student users
* Create 2 student records

Login credentials:

```
Email: admin@example.com
Password: Password@123
```

\--

## 📄 License

MIT License. See LICENSE file.

\--

## ✍️ Author

* UMUHIRE Germaine
* Email: [umuhiregerard12@gmail.com](mailto:umuhiregerard12@gmail.com)
