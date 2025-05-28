import React, { useState, useEffect, useRef } from 'react';
import { 
  XMarkIcon, 
  CheckIcon,
  TagIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotes } from '../../contexts/NotesContext';
import Select from 'react-select';
import AiAssistant from '../AI/AiAssistant';

const NoteEditor = ({ isOpen, onClose, note = null }) => {
  const { createNote, updateNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const titleInputRef = useRef(null);

  const isEditing = Boolean(note);

  const categoryOptions = [
    { value: '', label: 'No Category' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'ideas', label: 'Ideas' },
    { value: 'project', label: 'Project' },
    { value: 'meeting', label: 'Meeting' },
  ];

  useEffect(() => {
    if (isOpen) {
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setCategory(note.category || '');
      } else {
        setTitle('');
        setContent('');
        setCategory('');
      }
      // Focus title input after modal opens
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, note]);

  const handleSave = async () => {
    if (!title.trim()) {
      titleInputRef.current?.focus();
      return;
    }

    setIsSaving(true);
    try {
      const noteData = {
        title: title.trim(),
        content,
        category: category || undefined,
      };

      if (isEditing) {
        await updateNote(note.id, noteData);
      } else {
        await createNote(noteData);
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (title.trim() || content.trim()) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  // AI Assistant handlers
  const handleAiSuggestion = (type, value) => {
    switch (type) {
      case 'title':
        setTitle(value);
        break;
      case 'content':
        setContent(value);
        break;
      case 'category':
        setCategory(value);
        break;
      default:
        break;
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'link', 'color', 'background'
  ];

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      padding: '0.125rem',
      boxShadow: state.isFocused ? '0 0 0 2px #3b82f6' : 'none',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      '&:hover': {
        borderColor: '#9ca3af',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#374151',
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <TagIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isEditing ? 'Edit Note' : 'Create New Note'}
                  </h2>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    ✨ NoteAI - AI-Powered Note Editor
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving || !title.trim()}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <CheckIcon className="w-4 h-4" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save'}</span>
                </button>
                
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-hidden flex flex-col">
              {/* Title and Category */}
              <div className="space-y-4 mb-6">
                <div>
                  <input
                    ref={titleInputRef}
                    type="text"
                    placeholder="Note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Select
                      value={categoryOptions.find(option => option.value === category)}
                      onChange={(option) => setCategory(option?.value || '')}
                      options={categoryOptions}
                      placeholder="Select category..."
                      isClearable
                      isSearchable
                      styles={customSelectStyles}
                      className="text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* AI Assistant */}
              <AiAssistant
                content={content}
                title={title}
                onApplySuggestion={handleAiSuggestion}
              />

              {/* Rich Text Editor */}
              <div className="flex-1 overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Start writing your note... (Try the AI Assistant above for smart suggestions! 🤖)"
                  className="h-full"
                  style={{ height: 'calc(100% - 42px)' }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NoteEditor; 