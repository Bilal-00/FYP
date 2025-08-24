from django.urls import path
from . import views
from .views import AdminLoginView,GetUserDetailsView,CourseViewSet,SubjectViewSet,QuestionViewSet,QuestionOptionViewSet,ResultListCreateView, ResultDetailView

urlpatterns = [
    path('student/register/', views.student_registration, name='student_register'),
    path('admin/register/', views.admin_registration, name='admin_register'),
    path('student/login/', views.student_login, name='student_login'),
    path("admin/login/", AdminLoginView.as_view(), name="admin-login"),
    #path('admin/login/', views.admin_login, name='admin_login'),
    path('student/dashboard/', views.student_dashboard, name='student_dashboard'),
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('users/<int:user_id>/', GetUserDetailsView.as_view(), name='get_user_details'),

    # API endpoints for CRUD operations
    path('courses/', CourseViewSet.as_view({'get': 'list', 'post': 'create'}), name='course_list_create'),
    path('courses/<int:pk>/', CourseViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='course_detail'),
    
    path('subjects/', SubjectViewSet.as_view({'get': 'list', 'post': 'create'}), name='subject_list_create'),
    path('subjects/<int:pk>/', SubjectViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='subject_detail'),

    path('questions/', QuestionViewSet.as_view({'get': 'list', 'post': 'create'}), name='question_list_create'),
    path('questions/<int:pk>/', QuestionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='question_detail'),

    path('options/', QuestionOptionViewSet.as_view({'get': 'list', 'post': 'create'}), name='option_list_create'),
    path('options/<int:pk>/', QuestionOptionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='option_detail'),

    path('results/', ResultListCreateView.as_view(), name='result-list-create'),  # List all results or create a new one
    path('results/<int:pk>/', ResultDetailView.as_view(), name='result-detail'),  # Retrieve, update, or delete a specific result
    path('security-question/<str:username>/', views.get_security_question, name='get_security_question'),
    path('verify-security-answer/', views.verify_security_answer, name='verify_security_answer'),
    path('reset-password/', views.reset_password, name='reset_password'),
    path('results/subject/<int:subject_id>/delete/', views.delete_results_by_subject, name='delete-results-by-subject'),
    
]
