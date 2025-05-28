import React from 'react';
import { 
  Squares2X2Icon, 
  ListBulletIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useNotes } from '../../contexts/NotesContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const Header = ({ onNewNote }) => {
  const { viewMode, setViewMode, filteredNotes, selectedCategory } = useNotes();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'all':
        return 'All Notes';
      case 'work':
        return 'Work Notes';
      case 'personal':
        return 'Personal Notes';
      case 'ideas':
        return 'Ideas';
      case 'favorites':
        return 'Favorites';
      case 'archived':
        return 'Archived';
      default:
        return 'Notes';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              NoteAI
            </h1>
            <SparklesIcon className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>
          
          {/* AI-Powered Badge */}
          <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
            <SparklesIcon className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-bold">AI-Powered NoteApp</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onNewNote}
            className="btn-primary flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <PlusIcon className="w-5 h-5" />
            <span>New Note</span>
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            {isDark ? (
              <SunIcon className="w-6 h-6" />
            ) : (
              <MoonIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 