from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/<int:pk>/", views.NoteDetail.as_view(), name="note-detail"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("notes/<int:pk>/favorite/", views.toggle_favorite, name="toggle-favorite"),
    path("notes/<int:pk>/archive/", views.toggle_archive, name="toggle-archive"),
    
    # AI-Powered Endpoints 🤖
    path("ai/analyze/", views.ai_analyze_note, name="ai-analyze"),
    path("ai/enhance/", views.ai_enhance_content, name="ai-enhance"),
    path("ai/title/", views.ai_generate_title, name="ai-title"),
]
