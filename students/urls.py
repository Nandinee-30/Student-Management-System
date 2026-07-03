from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/students/', views.student_list_create, name='student-list-create'),
    path('api/students/<int:pk>/', views.student_detail, name='student-detail'),
    path('api/courses/', views.course_list, name='course-list'),
    path('api/departments/', views.department_list, name='department-list'),
]
