import json
from django.core.paginator import Paginator
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError

from .models import Student, Course, Department
from .forms import StudentForm

# Whitelist of fields students can be sorted by (prevents arbitrary
# column injection through the sort query parameter).
ALLOWED_SORT_FIELDS = {
    'first_name', 'last_name', 'roll_number', 'email',
    'enrollment_date', 'created_at', 'course__name',
}


def _student_to_dict(s: Student):
    return {
        'id': s.id,
        'roll_number': s.roll_number,
        'first_name': s.first_name,
        'last_name': s.last_name,
        'full_name': s.full_name,
        'email': s.email,
        'phone': s.phone,
        'gender': s.gender,
        'date_of_birth': s.date_of_birth.isoformat() if s.date_of_birth else None,
        'address': s.address,
        'course_id': s.course_id,
        'course_name': str(s.course),
        'enrollment_date': s.enrollment_date.isoformat() if s.enrollment_date else None,
        'is_active': s.is_active,
        'created_at': s.created_at.isoformat(),
        'updated_at': s.updated_at.isoformat(),
    }


@ensure_csrf_cookie
def index(request):
    """Serves the single-page frontend and sets the CSRF cookie."""
    return render(request, 'students/index.html')


@require_http_methods(['GET'])
def course_list(request):
    courses = Course.objects.select_related('department').all()
    data = [
        {
            'id': c.id,
            'name': c.name,
            'department': c.department.name,
            'label': str(c),
        }
        for c in courses
    ]
    return JsonResponse({'results': data})


@require_http_methods(['GET'])
def department_list(request):
    depts = Department.objects.all()
    return JsonResponse({'results': [{'id': d.id, 'name': d.name} for d in depts]})


@require_http_methods(['GET', 'POST'])
@csrf_protect
def student_list_create(request):
    if request.method == 'GET':
        qs = Student.objects.select_related('course', 'course__department').all()

        # --- Search (sanitized via ORM parameterized queries) ---
        search = request.GET.get('search', '').strip()
        if search:
            qs = qs.filter(
                Q(first_name__icontains=search)
                | Q(last_name__icontains=search)
                | Q(roll_number__icontains=search)
                | Q(email__icontains=search)
                | Q(course__name__icontains=search)
            )

        # --- Filter by course / active status ---
        course_id = request.GET.get('course_id')
        if course_id and course_id.isdigit():
            qs = qs.filter(course_id=course_id)

        is_active = request.GET.get('is_active')
        if is_active in ('true', 'false'):
            qs = qs.filter(is_active=(is_active == 'true'))

        # --- Sorting (whitelisted fields only) ---
        sort = request.GET.get('sort', 'created_at')
        order = request.GET.get('order', 'desc')
        if sort not in ALLOWED_SORT_FIELDS:
            sort = 'created_at'
        sort_expr = f"-{sort}" if order == 'desc' else sort
        qs = qs.order_by(sort_expr)

        # --- Pagination ---
        try:
            page_number = int(request.GET.get('page', 1))
            page_size = min(int(request.GET.get('page_size', 10)), 100)
        except ValueError:
            page_number, page_size = 1, 10

        paginator = Paginator(qs, page_size)
        page = paginator.get_page(page_number)

        return JsonResponse({
            'results': [_student_to_dict(s) for s in page.object_list],
            'count': paginator.count,
            'num_pages': paginator.num_pages,
            'current_page': page.number,
        })

    # POST - create
    try:
        payload = json.loads(request.body or '{}')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON body.'}, status=400)

    form = StudentForm(payload)
    if form.is_valid():
        student = form.save()
        return JsonResponse(_student_to_dict(student), status=201)
    return JsonResponse({'errors': form.errors}, status=400)


@require_http_methods(['GET', 'PUT', 'PATCH', 'DELETE'])
@csrf_protect
def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)

    if request.method == 'GET':
        return JsonResponse(_student_to_dict(student))

    if request.method in ('PUT', 'PATCH'):
        try:
            payload = json.loads(request.body or '{}')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON body.'}, status=400)

        form = StudentForm(payload, instance=student)
        if form.is_valid():
            student = form.save()
            return JsonResponse(_student_to_dict(student))
        return JsonResponse({'errors': form.errors}, status=400)

    # DELETE
    try:
        student.delete()
    except ValidationError as e:
        return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'message': 'Student deleted successfully.'}, status=200)
