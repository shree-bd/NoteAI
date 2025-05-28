import React, { useState } from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  StarIcon,
  EllipsisVerticalIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useNotes } from '../../contexts/NotesContext';
import { motion } from 'framer-motion';

const NoteCard = ({ note, viewMode = 'grid' }) => {
  const { deleteNote, selectNote } = useNotes();
  const [showActions, setShowActions] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    selectNote(note);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality in backend
  };

  const handleCardClick = () => {
    selectNote(note);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const truncateContent = (content, maxLength = 150) => {
    const plainText = stripHtml(content);
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-medium transition-all duration-200 cursor-pointer group"
        onClick={handleCardClick}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {note.title}
              </h3>
              {note.category && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  <TagIcon className="w-3 h-3 mr-1" />
                  {note.category}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {truncateContent(note.content)}
            </p>
            
            <div className="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {format(new Date(note.created_at), 'MMM dd, yyyy')}
            </div>
          </div>
          
          <div className={`flex items-center space-x-2 transition-opacity duration-200 ${
            showActions ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handleFavorite}
              className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
            >
              {isFavorite ? (
                <StarSolidIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <StarIcon className="w-5 h-5" />
              )}
            </button>
            
            <button
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="card cursor-pointer group relative"
      onClick={handleCardClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 pr-2">
          {note.title}
        </h3>
        
        <div className={`flex items-center space-x-1 transition-opacity duration-200 ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleFavorite}
            className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            {isFavorite ? (
              <StarSolidIcon className="w-4 h-4 text-yellow-500" />
            ) : (
              <StarIcon className="w-4 h-4" />
            )}
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <EllipsisVerticalIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category */}
      {note.category && (
        <div className="mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            <TagIcon className="w-3 h-3 mr-1" />
            {note.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">
          {truncateContent(note.content)}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-1" />
          {format(new Date(note.created_at), 'MMM dd, yyyy')}
        </div>
        
        <div className={`flex items-center space-x-2 transition-opacity duration-200 ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleEdit}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard; 