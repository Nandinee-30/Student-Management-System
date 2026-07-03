from django.db import models
from django.core.validators import RegexValidator

phone_validator = RegexValidator(
    regex=r'^\+?\d{7,15}$',
    message="Phone number must contain 7-15 digits, optionally starting with '+'."
)


class Department(models.Model):
    """Top-level entity. A department has many courses."""
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Course(models.Model):
    """A course belongs to a department. A course has many students."""
    name = models.CharField(max_length=100)
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, related_name='courses'
    )
    duration_years = models.PositiveSmallIntegerField(default=3)

    class Meta:
        unique_together = ('name', 'department')
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.department.name})"


class Student(models.Model):
    """
    Core entity for CRUD operations.
    Relational integrity enforced via FK to Course (PROTECT prevents
    deleting a course that still has enrolled students).
    """
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    roll_number = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, validators=[phone_validator])
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='O')
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(blank=True)
    course = models.ForeignKey(
        Course, on_delete=models.PROTECT, related_name='students'
    )
    enrollment_date = models.DateField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['roll_number']),
            models.Index(fields=['last_name', 'first_name']),
            models.Index(fields=['email']),
        ]

    def __str__(self):
        return f"{self.roll_number} - {self.first_name} {self.last_name}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
