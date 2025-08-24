import random
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Student,Course, Subject, Question, QuestionOption,Result
from django.contrib.auth import authenticate
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED
from rest_framework.views import APIView
from .serializers import PasswordResetSerializer, StudentRegistrationSerializer, LoginSerializer, DashboardSerializer,CourseSerializer, SubjectSerializer, QuestionSerializer, QuestionOptionSerializer,ResultSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets



# Helper function to generate JWT tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }

# Student Registration API
@api_view(['POST'])
def student_registration(request):
    if request.method == 'POST':
        serializer = StudentRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "Student registered successfully!",
                "user": serializer.data,
                "token": get_tokens_for_user(user),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# Admin Registration API
@api_view(['POST'])
def admin_registration(request):
    if request.method == 'POST':
        serializer = StudentRegistrationSerializer(data=request.data)  # You can reuse the same serializer
        if serializer.is_valid():
            user = serializer.save()

            # Set admin privileges
            user.is_staff = True
            user.is_superuser = True
            user.save()

            return Response({
                "message": "Admin registered successfully!",
                "user": serializer.data,
                "token": get_tokens_for_user(user),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Student Login API
@api_view(['POST'])
def student_login(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = get_tokens_for_user(user)
            return Response({
                "message": "Login successful!",
                "token": token
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Admin Login API
@api_view(['POST'])
@permission_classes([permissions.IsAdminUser])
def admin_login(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = get_tokens_for_user(user)
            return Response({
                "message": "Admin login successful!",
                "token": token
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Student Dashboard API (Only accessible after JWT authentication)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def student_dashboard(request):
    if request.user.is_authenticated and isinstance(request.user, Student):
        serializer = DashboardSerializer(request.user)
        return Response({
            "message": "Student Dashboard",
            "user": serializer.data
        })
    return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

# Admin Dashboard API (Only accessible after JWT authentication)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def admin_dashboard(request):
    if request.user.is_authenticated and request.user.is_staff:
        serializer = DashboardSerializer(request.user)
        return Response({
            "message": "Admin Dashboard",
            "user": serializer.data
        })
    return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # Authenticate the user
        user = authenticate(username=username, password=password)

        if user and user.is_superuser:
            # Generate JWT tokens for the superuser
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "Admin login successful!",
                    "token": {
                        "access": str(refresh.access_token),
                        "refresh": str(refresh),
                    },
                },
                status=HTTP_200_OK,
            )
        return Response({"message": "Invalid credentials or not an admin."}, status=HTTP_401_UNAUTHORIZED)
    


class GetUserDetailsView(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated]  # Ensure that the user is authenticated

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        try:
            user = self.get_queryset().get(id=user_id)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response({"error": "User  not found"}, status=404)
        


class CourseViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for Course model
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for Subject model
    """
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        course_id = self.request.query_params.get('course')  # Get the 'course' query parameter
        if course_id:
            queryset = queryset.filter(course_id=course_id)  # Filter subjects by course ID
        return queryset


class QuestionViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for Question model
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        subject_id = self.request.query_params.get('subject')  # Get the 'subject' query parameter
        if subject_id:
            queryset = queryset.filter(subject_id=subject_id)  # Filter questions by subject ID
        return queryset


class QuestionOptionViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for QuestionOption model
    """
    queryset = QuestionOption.objects.all()
    serializer_class = QuestionOptionSerializer
    def get_queryset(self):
        question_id = self.request.query_params.get('question')
        if question_id:
            return self.queryset.filter(question_id=question_id)
        return self.queryset

# View for listing all results and creating a new result
class ResultListCreateView(generics.ListCreateAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

    def get_queryset(self):
        """
        Optionally filter results by subject ID using the 'subject' query parameter.
        """
        queryset = super().get_queryset()
        subject_id = self.request.query_params.get('subject', None)
        if subject_id is not None:
            queryset = queryset.filter(subject_id=subject_id)
        return queryset

    
# View for retrieving, updating, or deleting a specific result
class ResultDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer




FAKE_MESSAGES = [
    "My best friend's name",
    "My favorite teacher",
    "My childhood nickname",
    "My dream job",
    "My first school",
    "My favorite game",
    "The name of my first crush",
    "My favorite movie"
]

@api_view(['GET'])
def get_security_question(request, username):
    try:
        user = Student.objects.get(username=username)
        real_message = user.security_message or "Unknown"

        # Pick 3 fake options (that don't include the real one)
        fake_options = random.sample([m for m in FAKE_MESSAGES if m != real_message], 3)

        return Response({
            "real_message": real_message,
            "fake_options": fake_options
        }, status=status.HTTP_200_OK)

    except Student.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)



from .serializers import SecurityAnswerSerializer
@api_view(['POST'])
def verify_security_answer(request):
    serializer = SecurityAnswerSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        selected_answer = serializer.validated_data['selected_answer']

        try:
            user = Student.objects.get(username=username)
            if user.security_message.strip().lower() == selected_answer.strip().lower():
                return Response({"success": True}, status=status.HTTP_200_OK)
            else:
                return Response({"success": False}, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





from django.contrib.auth.hashers import make_password
@api_view(['POST'])
def reset_password(request):
    serializer = PasswordResetSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        new_password = serializer.validated_data['new_password']

        try:
            user = Student.objects.get(username=username)
            user.password = make_password(new_password)
            user.save()
            return Response({"message": "Password reset successfully."}, status=status.HTTP_200_OK)

        except Student.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def delete_results_by_subject(request, subject_id):
    try:
        deleted_count, _ = Result.objects.filter(subject_id=subject_id).delete()
        return Response(
            {"message": f"Deleted {deleted_count} results for subject {subject_id}"},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )