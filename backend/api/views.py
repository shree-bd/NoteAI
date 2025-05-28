from django.shortcuts import render
from django.contrib.auth.models import User
from django.db import models
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Note.objects.filter(author=user)
        
        # Filter by category if provided
        category = self.request.query_params.get('category', None)
        if category and category != 'all':
            if category == 'favorites':
                queryset = queryset.filter(is_favorite=True)
            elif category == 'archived':
                queryset = queryset.filter(is_archived=True)
            else:
                queryset = queryset.filter(category=category)
        
        # Search functionality
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                models.Q(title__icontains=search) | 
                models.Q(content__icontains=search)
            )
            
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def toggle_favorite(request, pk):
    try:
        note = Note.objects.get(pk=pk, author=request.user)
        note.is_favorite = not note.is_favorite
        note.save()
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    except Note.DoesNotExist:
        return Response(
            {'error': 'Note not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def toggle_archive(request, pk):
    try:
        note = Note.objects.get(pk=pk, author=request.user)
        note.is_archived = not note.is_archived
        note.save()
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    except Note.DoesNotExist:
        return Response(
            {'error': 'Note not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
