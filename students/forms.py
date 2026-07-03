from django import forms
from django.core.exceptions import ValidationError
import datetime
from .models import Student, Course, Department


class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = [
            'roll_number', 'first_name', 'last_name', 'email', 'phone',
            'gender', 'date_of_birth', 'address', 'course',
            'enrollment_date', 'is_active',
        ]

    def clean_roll_number(self):
        roll = self.cleaned_data['roll_number'].strip().upper()
        if not roll:
            raise ValidationError("Roll number is required.")
        return roll

    def clean_date_of_birth(self):
        dob = self.cleaned_data.get('date_of_birth')
        if dob and dob > datetime.date.today():
            raise ValidationError("Date of birth cannot be in the future.")
        return dob

    def clean_enrollment_date(self):
        edate = self.cleaned_data.get('enrollment_date')
        if edate and edate > datetime.date.today():
            raise ValidationError("Enrollment date cannot be in the future.")
        return edate

    def clean(self):
        cleaned_data = super().clean()
        dob = cleaned_data.get('date_of_birth')
        edate = cleaned_data.get('enrollment_date')
        if dob and edate and dob >= edate:
            raise ValidationError("Enrollment date must be after date of birth.")
        return cleaned_data


class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['name', 'department', 'duration_years']


class DepartmentForm(forms.ModelForm):
    class Meta:
        model = Department
        fields = ['name']
