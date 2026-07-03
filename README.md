# Student Management System (Django + MySQL)

Enterprise CRUD system for managing students, courses, and departments.

## Stack
- **Frontend:** HTML, CSS, JavaScript (vanilla, no build step)
- **Backend:** Django 5 (layered: models / forms / views / urls)
- **Database:** MySQL

## Schema (relational integrity)
```
Department (1) ──< Course (1) ──< Student
```
- `Course.department` → FK, `on_delete=PROTECT`
- `Student.course` → FK, `on_delete=PROTECT` (a course with enrolled students can't be deleted)
- Indexes on `roll_number`, `email`, and `(last_name, first_name)` for fast search/sort

## Setup

### 1. Create a virtual environment & install dependencies
```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Create the MySQL database
```sql
CREATE DATABASE student_management CHARACTER SET utf8mb4;
```

### 3. Configure environment variables
```bash
cp .env.example .env
# then edit .env with your MySQL username/password
```

### 4. Run migrations
```bash
python manage.py makemigrations students
python manage.py migrate
```

### 5. (Optional) Load sample departments & courses
```bash
python manage.py loaddata students/fixtures/initial_data.json
```

### 6. Create an admin user (optional, for /admin/)
```bash
python manage.py createsuperuser
```

### 7. Run the server
```bash
python manage.py runserver
```
Open **http://127.0.0.1:8000/** for the app, or **http://127.0.0.1:8000/admin/** for the Django admin.

## Features implemented
- Full CRUD on students (create, read, update, delete) with relational integrity to Course/Department
- Layered architecture: `models.py` (data) → `forms.py` (validation) → `views.py` (business logic/API) → `urls.py` (routing) → templates/JS (presentation)
- Parameterized ORM queries (no raw SQL / injection-safe)
- Server-side search (name, roll number, email, course), filtering (course, active status), and whitelisted sorting
- Pagination
- Form validation on both frontend (JS) and backend (Django form `clean_*` methods)
- CSRF-protected write endpoints
- Django admin panel for direct data management

## API endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students/?search=&sort=&order=&course_id=&is_active=&page=&page_size=` | List/search/sort/paginate |
| POST | `/api/students/` | Create student |
| GET | `/api/students/<id>/` | Retrieve one student |
| PUT/PATCH | `/api/students/<id>/` | Update student |
| DELETE | `/api/students/<id>/` | Delete student |
| GET | `/api/courses/` | List courses (for dropdowns) |
| GET | `/api/departments/` | List departments |
