# Task Management System

A MERN Stack Task Management System that allows users to manage Tasks and Todos with secure authentication, role-based access control (RBAC), and profile management.

---

## Features

### Authentication
- User Registration
- User Login & Logout
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt
- Cookie-based Authentication

### Task Management
- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks
- User-specific Tasks (each user can only access their own tasks)

### Todo Management
- Create Todos
- View Todos
- Update Todos
- Delete Todos
- User-specific Todos

### Dashboard
- Dashboard with Task Statistics
- Dashboard with Todo Statistics
- Shows Total, Completed, and Pending counts
- Displays recent Tasks and Todos
- Dashboard content changes according to the user's permissions

### Admin Panel
- Admin Dashboard
- View all registered users
- Assign module permissions
  - Task Module
  - Todo Module

### Profile
- Upload Profile Picture
- View Profile Information
- Instant profile image update after upload

### Security
- JWT Authentication
- Protected API Routes
- Role-based Access Control (RBAC)
- Admin-only routes

---

## Tech Stack

### Frontend
- React
- React Router
- Bootstrap 5
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cookie Parser

---

## Project Structure

### Frontend

```
src
│
├── components
├── features
│   ├── auth
│   ├── tasks
│   ├── todo
│   ├── profile
│   ├── userdashboard
│   └── adminDashboard
├── pages
├── services
└── routes
```

### Backend

```
src
│
├── controllers
├── middleware
├── models
├── routes
├── services
├── uploads
├── utils
└── index.js
```

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install dependencies

#### Server

```bash
cd server
npm install
```

#### Client

```bash
cd client
npm install
```

---

## Environment Variables

Create a `.env` file in the server directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
SALT_ROUND=10
email= Admin_email
password= Admin_password
```

---

## Run the Project

### Backend

```bash
npm start
```

or

```bash
node src/index.js
```

### Frontend

```bash
npm run dev
```

---

## Default Admin Account

```
Email: admin@gmail.com
Password: admin123
```

---

## API Features

### Authentication
- Register
- Login
- Logout
- Verify User

### Tasks
- Add Task
- Get Tasks
- Update Task
- Delete Task

### Todos
- Add Todo
- Get Todos
- Update Todo
- Delete Todo

### Admin
- Get All Users
- Update User Permissions

### Profile
- Upload Profile Image

---

## Usage

1. Register a new user or log in with the default admin account.
2. Admin can assign Task and Todo permissions to users.
3. Users can only access the modules assigned by the admin.
4. Users can manage only their own Tasks and Todos.
5. Upload and update a profile picture from the Profile page.

---


## Author

**Hadia Shahid**