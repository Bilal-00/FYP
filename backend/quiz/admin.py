from django.contrib import admin
from .models import Student ,Course, Subject, Question, QuestionOption,Result

# Register the Student model with the default admin interface
admin.site.register(Student)

class QuestionOptionInline(admin.TabularInline):
    model = QuestionOption
    extra = 1  # Adds a default empty row to create new options


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1  # Adds a default empty row to create new questions


class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'course')  # Display course name and subject name
    search_fields = ('name', 'course__name')  # Allows searching by course or subject name
    list_filter = ('course',)  # Filter subjects by course


class CourseAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'subject')  # Display question and subject
    search_fields = ('question',)
    list_filter = ('subject',)  # Filter questions by subject
    inlines = [QuestionOptionInline]  # Display question options inline


class QuestionOptionAdmin(admin.ModelAdmin):
    list_display = ('option', 'is_correct', 'question')
    search_fields = ('option', 'question__question')  # Search by option text or question text


# Result model admin
class ResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'marks', 'date')
    search_fields = ('student__username', 'subject__name')
    list_filter = ('subject', 'date')




# Registering the models with their respective admin classes
admin.site.register(Course, CourseAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(QuestionOption, QuestionOptionAdmin)
admin.site.register(Result, ResultAdmin)