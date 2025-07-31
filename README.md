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

## 📦 Installation & Usage

### 1. Clone the repository

```bash
git clone https://github.com/your-username/student-management-system-frontend.git
cd student-management-system-frontend

