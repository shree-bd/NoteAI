import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

const initialState = {
  notes: [],
  categories: [],
  loading: false,
  searchTerm: '',
  selectedCategory: 'all',
  selectedNote: null,
  viewMode: 'grid', // 'grid' or 'list'
  isCreating: false,
};

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_NOTES':
      return { ...state, notes: action.payload, loading: false };
    case 'ADD_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? action.payload : note
        ),
        selectedNote: action.payload
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
        selectedNote: state.selectedNote?.id === action.payload ? null : state.selectedNote
      };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SELECTED_NOTE':
      return { ...state, selectedNote: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_IS_CREATING':
      return { ...state, isCreating: action.payload };
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const fetchNotes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await api.get('/api/notes/');
      dispatch({ type: 'SET_NOTES', payload: response.data });
    } catch (error) {
      toast.error('Failed to fetch notes');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createNote = async (noteData) => {
    try {
      const response = await api.post('/api/notes/', noteData);
      dispatch({ type: 'ADD_NOTE', payload: response.data });
      toast.success('Note created successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to create note');
      throw error;
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const response = await api.put(`/api/notes/${id}/`, noteData);
      dispatch({ type: 'UPDATE_NOTE', payload: response.data });
      toast.success('Note updated successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to update note');
      throw error;
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/api/notes/delete/${id}/`);
      dispatch({ type: 'DELETE_NOTE', payload: id });
      toast.success('Note deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete note');
      throw error;
    }
  };

  const searchNotes = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const selectCategory = (category) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  };

  const selectNote = (note) => {
    dispatch({ type: 'SET_SELECTED_NOTE', payload: note });
  };

  const setViewMode = (mode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  };

  const setIsCreating = (creating) => {
    dispatch({ type: 'SET_IS_CREATING', payload: creating });
  };

  // Filter notes based on search and category
  const filteredNotes = state.notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(state.searchTerm.toLowerCase());
    const matchesCategory = state.selectedCategory === 'all' || 
                           (note.category && note.category === state.selectedCategory);
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const value = {
    ...state,
    filteredNotes,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    selectCategory,
    selectNote,
    setViewMode,
    setIsCreating,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}; 