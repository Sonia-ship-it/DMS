# 🎓 Discipline Management System

A modern backend system designed to **track student discipline records**, manage **staff access**, and ensure **secure, efficient school operations**.

---

## 📌 Overview

The **Discipline Management System** is built to help schools manage student behavior in a structured and transparent way.

It allows staff to:

* Record when a student leaves school
* Track reasons for leaving
* Monitor return times
* Access student discipline history anytime

---

## 🚀 Features

### 👨‍🎓 Student Management

* Create and manage student profiles
* Store parent details and contact information
* Track student status (IN / OUT / RETURNED)

### 👩‍🏫 Staff Management

* Secure staff registration
* Role-based access (Admin / Staff)
* Password hashing for security

### 📋 Discipline Records

* Record student exit with reason
* Track return date and time
* View full discipline history

### 🔐 Authentication & Security

* JWT-based authentication
* Password hashing using bcrypt
* Rate limiting on login attempts
* Protection against SQL Injection (via Prisma ORM)

---

## 🏗️ Tech Stack

* **Backend Framework:** NestJS
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT (JSON Web Token)
* **Validation:** class-validator
* **Security:** bcrypt, rate limiting

---

## 📂 Project Structure

```
src/
│── auth/                # Authentication (login, register, JWT)
│── student/             # Student module
│── staff/               # Staff module
│── discipline-record/   # Discipline records module
│── prisma/              # Prisma service & database config
│── main.ts              # Entry point
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/Discipline-Management-System.git
cd Discipline-Management-System
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run Prisma migration

```bash
npx prisma migrate dev
```

### 5️⃣ Start the server

```bash
npm run start:dev
```

---

## 🔑 API Endpoints

### 🔐 Auth

* `POST /auth/register` → Register staff
* `POST /auth/login` → Login (returns JWT)

### 👨‍🎓 Students

* `POST /students` → Create student
* `GET /students` → Get all students
* `GET /students/:id` → Get single student
* `PATCH /students/:id` → Update student
* `DELETE /students/:id` → Delete student

### 👩‍🏫 Staff

* `GET /staff` → Get all staff
* `PATCH /staff/:id` → Update staff

### 📋 Discipline Records

* `POST /records` → Create record
* `GET /records` → Get all records
* `PATCH /records/:id` → Update record

---

## 🔐 Authentication Usage

After login, include the token in requests:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🧠 System Workflow

1. Staff logs into the system
2. Student is registered in the system
3. When a student leaves → record is created
4. When student returns → record is updated
5. Staff can view full discipline history anytime

---

## 🎯 Goals of the Project

* Improve **student accountability**
* Enhance **school discipline tracking**
* Provide **real-time access to student records**
* Ensure **data security and integrity**

---

## 📈 Future Improvements

* Role-based authorization (Admin vs Staff)
* Dashboard & analytics
* Notifications for parents
* Mobile app integration

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed with passion to solve real-world school management challenges.

---
