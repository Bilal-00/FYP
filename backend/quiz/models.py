from django.contrib.auth.models import AbstractUser
from django.db import models

class Student(AbstractUser):
    profile_pic = models.ImageField(upload_to='profile/images', blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    security_message = models.CharField(max_length=255, blank=True, null=True)
    


class Course(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class Subject(models.Model):
    course = models.ForeignKey(Course, related_name='subjects', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    class Meta:
        unique_together = ('course', 'name')  # Ensures a subject name is unique per course

    def __str__(self):
        return f"{self.name} ({self.course.name})"


class Question(models.Model):
    subject = models.ForeignKey(Subject, related_name='questions', on_delete=models.CASCADE)
    question = models.CharField(max_length=500, unique=True)

    def __str__(self):
        return self.question


class QuestionOption(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    option = models.CharField(max_length=300)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.option} for {self.question.question}"
    

class Result(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    marks = models.PositiveIntegerField(default=0)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Result of {self.student.username} for {self.subject.name} - {self.marks} marks"
