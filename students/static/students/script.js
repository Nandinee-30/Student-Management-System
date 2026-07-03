// ---------- Config & state ----------
const API_BASE = '/api';
let state = {
  page: 1,
  pageSize: 10,
  search: '',
  courseId: '',
  isActive: '',
  sort: 'created_at',
  order: 'desc',
  courses: [],
};

// ---------- Helpers ----------
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}
const csrftoken = () => getCookie('csrftoken');

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type}`;
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

async function apiRequest(url, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (!['GET', 'HEAD'].includes(options.method || 'GET')) {
    headers['X-CSRFToken'] = csrftoken();
  }
  const res = await fetch(url, { ...options, headers, credentials: 'same-origin' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error('Request failed');
    err.data = data;
    err.status = res.status;
    throw err;
  }
  return data;
}

// ---------- Data loading ----------
async function loadCourses() {
  const data = await apiRequest(`${API_BASE}/courses/`);
  state.courses = data.results;
  const courseFilter = document.getElementById('courseFilter');
  const courseSelect = document.getElementById('course');
  courseFilter.innerHTML = '<option value="">All Courses</option>';
  courseSelect.innerHTML = '';
  data.results.forEach(c => {
    courseFilter.insertAdjacentHTML('beforeend', `<option value="${c.id}">${c.label}</option>`);
    courseSelect.insertAdjacentHTML('beforeend', `<option value="${c.id}">${c.label}</option>`);
  });
}

function buildQuery() {
  const params = new URLSearchParams({
    page: state.page,
    page_size: state.pageSize,
    sort: state.sort,
    order: state.order,
  });
  if (state.search) params.set('search', state.search);
  if (state.courseId) params.set('course_id', state.courseId);
  if (state.isActive) params.set('is_active', state.isActive);
  return params.toString();
}

async function loadStudents() {
  const tbody = document.getElementById('studentsBody');
  tbody.innerHTML = '<tr><td colspan="8" class="empty-msg">Loading...</td></tr>';
  try {
    const data = await apiRequest(`${API_BASE}/students/?${buildQuery()}`);
    renderStudents(data.results);
    document.getElementById('pageInfo').textContent = `Page ${data.current_page} of ${Math.max(data.num_pages, 1)} (${data.count} total)`;
    document.getElementById('prevPage').disabled = data.current_page <= 1;
    document.getElementById('nextPage').disabled = data.current_page >= data.num_pages;
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-msg">Failed to load students.</td></tr>';
    showToast('Could not load students', 'error');
  }
}

function renderStudents(students) {
  const tbody = document.getElementById('studentsBody');
  if (!students.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-msg">No students found.</td></tr>';
    return;
  }
  tbody.innerHTML = students.map(s => `
    <tr>
      <td>${escapeHtml(s.roll_number)}</td>
      <td>${escapeHtml(s.full_name)}</td>
      <td>${escapeHtml(s.email)}</td>
      <td>${escapeHtml(s.phone)}</td>
      <td>${escapeHtml(s.course_name)}</td>
      <td>${s.enrollment_date || '-'}</td>
      <td><span class="badge ${s.is_active ? 'badge-active' : 'badge-inactive'}">${s.is_active ? 'Active' : 'Inactive'}</span></td>
      <td>
        <button class="btn btn-small" data-edit="${s.id}">Edit</button>
        <button class="btn btn-small btn-danger" data-delete="${s.id}">Delete</button>
      </td>
    </tr>
  `).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

// ---------- Frontend validation ----------
function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
}

function setError(field, message) {
  const el = document.querySelector(`.error-msg[data-for="${field}"]`);
  if (el) el.textContent = message;
}

function validateForm(payload) {
  clearErrors();
  let valid = true;

  if (!payload.roll_number.trim()) { setError('roll_number', 'Roll number is required.'); valid = false; }
  if (!payload.first_name.trim()) { setError('first_name', 'First name is required.'); valid = false; }
  if (!payload.last_name.trim()) { setError('last_name', 'Last name is required.'); valid = false; }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(payload.email)) { setError('email', 'Enter a valid email address.'); valid = false; }

  const phoneRe = /^\+?\d{7,15}$/;
  if (!phoneRe.test(payload.phone)) { setError('phone', 'Phone must be 7-15 digits, optional leading +.'); valid = false; }

  if (!payload.course) { setError('course', 'Please select a course.'); valid = false; }
  if (!payload.enrollment_date) { setError('enrollment_date', 'Enrollment date is required.'); valid = false; }

  const today = new Date().toISOString().split('T')[0];
  if (payload.date_of_birth && payload.date_of_birth > today) {
    setError('date_of_birth', 'Date of birth cannot be in the future.'); valid = false;
  }
  if (payload.enrollment_date && payload.enrollment_date > today) {
    setError('enrollment_date', 'Enrollment date cannot be in the future.'); valid = false;
  }
  if (payload.date_of_birth && payload.enrollment_date && payload.date_of_birth >= payload.enrollment_date) {
    setError('enrollment_date', 'Must be after date of birth.'); valid = false;
  }

  return valid;
}

function showBackendErrors(errors) {
  Object.entries(errors).forEach(([field, messages]) => {
    setError(field, Array.isArray(messages) ? messages[0].message || messages[0] : messages);
  });
}

// ---------- Modal ----------
const modal = document.getElementById('studentModal');
const form = document.getElementById('studentForm');

function openModal(student = null) {
  clearErrors();
  form.reset();
  document.getElementById('studentId').value = '';
  document.getElementById('modalTitle').textContent = student ? 'Edit Student' : 'Add Student';
  document.getElementById('is_active').checked = true;

  if (student) {
    document.getElementById('studentId').value = student.id;
    document.getElementById('roll_number').value = student.roll_number;
    document.getElementById('first_name').value = student.first_name;
    document.getElementById('last_name').value = student.last_name;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone;
    document.getElementById('gender').value = student.gender;
    document.getElementById('date_of_birth').value = student.date_of_birth || '';
    document.getElementById('enrollment_date').value = student.enrollment_date || '';
    document.getElementById('course').value = student.course_id;
    document.getElementById('address').value = student.address || '';
    document.getElementById('is_active').checked = student.is_active;
  }
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

// ---------- Event bindings ----------
document.getElementById('addStudentBtn').addEventListener('click', () => openModal());
document.getElementById('cancelBtn').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

document.getElementById('searchInput').addEventListener('input', debounce((e) => {
  state.search = e.target.value.trim();
  state.page = 1;
  loadStudents();
}, 350));

document.getElementById('courseFilter').addEventListener('change', (e) => {
  state.courseId = e.target.value;
  state.page = 1;
  loadStudents();
});
document.getElementById('activeFilter').addEventListener('change', (e) => {
  state.isActive = e.target.value;
  state.page = 1;
  loadStudents();
});
document.getElementById('sortField').addEventListener('change', (e) => {
  state.sort = e.target.value;
  loadStudents();
});
document.getElementById('sortOrder').addEventListener('change', (e) => {
  state.order = e.target.value;
  loadStudents();
});
document.getElementById('prevPage').addEventListener('click', () => {
  if (state.page > 1) { state.page--; loadStudents(); }
});
document.getElementById('nextPage').addEventListener('click', () => {
  state.page++; loadStudents();
});

document.getElementById('studentsBody').addEventListener('click', async (e) => {
  const editId = e.target.dataset.edit;
  const deleteId = e.target.dataset.delete;

  if (editId) {
    try {
      const student = await apiRequest(`${API_BASE}/students/${editId}/`);
      openModal(student);
    } catch {
      showToast('Could not load student details', 'error');
    }
  }

  if (deleteId) {
    if (!confirm('Delete this student? This cannot be undone.')) return;
    try {
      await apiRequest(`${API_BASE}/students/${deleteId}/`, { method: 'DELETE' });
      showToast('Student deleted successfully');
      loadStudents();
    } catch (err) {
      showToast(err.data?.error || 'Delete failed', 'error');
    }
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('studentId').value;
  const payload = {
    roll_number: document.getElementById('roll_number').value,
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    gender: document.getElementById('gender').value,
    date_of_birth: document.getElementById('date_of_birth').value || null,
    enrollment_date: document.getElementById('enrollment_date').value,
    course: document.getElementById('course').value,
    address: document.getElementById('address').value,
    is_active: document.getElementById('is_active').checked,
  };

  if (!validateForm(payload)) return;

  try {
    if (id) {
      await apiRequest(`${API_BASE}/students/${id}/`, { method: 'PUT', body: JSON.stringify(payload) });
      showToast('Student updated successfully');
    } else {
      await apiRequest(`${API_BASE}/students/`, { method: 'POST', body: JSON.stringify(payload) });
      showToast('Student added successfully');
    }
    closeModal();
    loadStudents();
  } catch (err) {
    if (err.status === 400 && err.data?.errors) {
      showBackendErrors(err.data.errors);
    } else {
      showToast('Something went wrong. Please try again.', 'error');
    }
  }
});

// ---------- Init ----------
(async function init() {
  await loadCourses();
  await loadStudents();
})();
