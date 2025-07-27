from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Student, Course, Subject, Question, QuestionOption,Result
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.validators import validate_email
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.validators import UniqueValidator

# Serializer for registration
class StudentRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=Student.objects.all(), message="Email already exists.")]
    )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=Student.objects.all(), message="Username already exists.")]
    )
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Student
        fields = [
            'first_name', 'last_name', 'email', 'profile_pic',
            'phone_number', 'department', 'username', 'password'
        ]

    def validate_email(self, value):
        try:
            validate_email(value)
        except DjangoValidationError:
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    def create(self, validated_data):
        user = Student.objects.create_user(**validated_data)
        return user
# class StudentRegistrationSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = Student
#         fields = ['first_name', 'last_name', 'email', 'profile_pic', 'phone_number', 'department', 'username', 'password']
    
#     def create(self, validated_data):
#         user = Student.objects.create_user(**validated_data)
#         return user

# Serializer for login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return user



class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ('id', 'question', 'option', 'is_correct')


class QuestionSerializer(serializers.ModelSerializer):
    options = QuestionOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ('id', 'question', 'subject', 'options')


class SubjectSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Subject
        fields = ('id', 'name', 'course', 'questions')


class CourseSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ('id', 'name', 'subjects')



class ResultSerializer(serializers.ModelSerializer):
    student = serializers.SlugRelatedField(queryset=Student.objects.all(), slug_field='username')
    #student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all()) 
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all())
    #student = StudentRegistrationSerializer(read_only=True)  # Displays the student's username
    #student= serializers.StringRelatedField()
    #subject = serializers.StringRelatedField()  # Displays the subject's name
    #subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ['id', 'student', 'subject', 'marks', 'date']
    


# Serializer for Admin and Student Dashboard
class DashboardSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    profile_pic = serializers.ImageField()
    phone_number = serializers.CharField()
    department = serializers.CharField()
    results = ResultSerializer(many=True, read_only=True)

    class Meta:
        fields = ['username', 'email', 'first_name', 'last_name', 'profile_pic', 'phone_number', 'department', 'results']
