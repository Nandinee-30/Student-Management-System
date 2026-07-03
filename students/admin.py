from django.contrib import admin
from .models import Department, Course, Student


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'department', 'duration_years')
    list_filter = ('department',)
    search_fields = ('name',)


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'first_name', 'last_name', 'email', 'course', 'is_active')
    list_filter = ('course', 'is_active', 'gender')
    search_fields = ('roll_number', 'first_name', 'last_name', 'email')
