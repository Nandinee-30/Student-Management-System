# 🎓 Student Management System (Django + MySQL)

An **Enterprise CRUD System** for managing **Students, Courses, and Departments** using **Django** and **MySQL**.

---

## 📖 Overview

This project is designed to efficiently manage student records with a secure and scalable architecture. It provides complete **CRUD functionality**, relational database management, search, filtering, sorting, pagination, and validation using Django and MySQL.

---

## 🚀 Tech Stack

- 🎨 **Frontend:** HTML, CSS, JavaScript (Vanilla)
- ⚙️ **Backend:** Django 5
- 🗄️ **Database:** MySQL

---

## 🏗️ Project Architecture

The project follows a **Layered Architecture** for better maintainability.

```
Models → Forms → Views → URLs → Templates → JavaScript
```

- 📦 **Models** – Database Structure
- ✅ **Forms** – Validation
- ⚙️ **Views** – Business Logic & APIs
- 🔗 **URLs** – Routing
- 🎨 **Templates** – User Interface
- 💻 **JavaScript** – Client-side Interactions

---

## 🗃️ Database Schema

```
Department (1)
      │
      ▼
Course (1)
      │
      ▼
Student
```

### 🔗 Relationships

- `Course.department` → **ForeignKey** (`on_delete=PROTECT`)
- `Student.course` → **ForeignKey** (`on_delete=PROTECT`)

### ⚡ Database Optimization

Indexes are applied on:

- Roll Number
- Email
- Last Name + First Name

for faster searching and sorting.

---

# ⚙️ Installation & Setup

## 1️⃣ Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment

**Windows**

```bash
venv\Scripts\activate
```

**Linux/macOS**

```bash
source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 2️⃣ Create MySQL Database

```sql
CREATE DATABASE student_management CHARACTER SET utf8mb4;
```

---

## 3️⃣ Configure Environment Variables

```bash
cp .env.example .env
```

Update the `.env` file with your MySQL username and password.

---

## 4️⃣ Run Migrations

```bash
python manage.py makemigrations students
python manage.py migrate
```

---

## 5️⃣ Load Sample Data *(Optional)*

```bash
python manage.py loaddata students/fixtures/initial_data.json
```

---

## 6️⃣ Create Admin User *(Optional)*

```bash
python manage.py createsuperuser
```

---

## 7️⃣ Run the Server

```bash
python manage.py runserver
```

🌐 **Application**

```
http://127.0.0.1:8000/
```

🛠️ **Admin Panel**

```
http://127.0.0.1:8000/admin/
```

---

# ✨ Features

- ✅ Student CRUD Operations
- 👨‍🎓 Student, Course & Department Management
- 🏗️ Layered Architecture
- 🔐 Secure ORM Queries
- 🔍 Search Functionality
- 🎯 Filtering
- 📊 Sorting
- 📄 Pagination
- ✔️ Frontend & Backend Validation
- 🛡️ CSRF Protection
- ⚙️ Django Admin Panel

---

# 🔌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/students/?search=&sort=&order=&course_id=&is_active=&page=&page_size=` | List, Search, Filter & Paginate Students |
| POST | `/api/students/` | Create Student |
| GET | `/api/students/<id>/` | Retrieve Student Details |
| PUT / PATCH | `/api/students/<id>/` | Update Student |
| DELETE | `/api/students/<id>/` | Delete Student |
| GET | `/api/courses/` | Retrieve Courses |
| GET | `/api/departments/` | Retrieve Departments |

---

# 📂 Project Structure

```
Student-Management-System/
│
├── students/
│   ├── models.py
│   ├── forms.py
│   ├── views.py
│   ├── urls.py
│   ├── templates/
│   └── static/
│
├── studentms/
├── manage.py
├── requirements.txt
├── .env.example
└── README.md
```

---

# 📌 Key Highlights

- 🚀 Enterprise CRUD System
- 🏗️ Layered Django Architecture
- 🗄️ MySQL Relational Database
- 🔒 Secure & Parameterized ORM Queries
- ⚡ Search, Filter, Sort & Pagination
- ✅ Form Validation
- 📱 Responsive User Interface

---

---

# 👩‍💻 Author

**Nandinee**

- 💻 Passionate about Full Stack Development
- 🚀 Interested in Django, Python, JavaScript, and Web Development

🌐 **GitHub:** https://github.com/Nandinee-30

# 📄 License

This project is developed for **educational and learning purposes**.