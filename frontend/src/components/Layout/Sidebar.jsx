import React from 'react';
import { 
  HomeIcon, 
  BriefcaseIcon, 
  UserIcon, 
  LightBulbIcon,
  HeartIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useNotes } from '../../contexts/NotesContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    notes 
  } = useNotes();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const categories = [
    { id: 'all', label: 'All Notes', icon: HomeIcon, count: notes.length },
    { id: 'work', label: 'Work', icon: BriefcaseIcon, count: notes.filter(n => n.category === 'work').length },
    { id: 'personal', label: 'Personal', icon: UserIcon, count: notes.filter(n => n.category === 'personal').length },
    { id: 'ideas', label: 'Ideas', icon: LightBulbIcon, count: notes.filter(n => n.category === 'ideas').length },
    { id: 'favorites', label: 'Favorites', icon: HeartIcon, count: notes.filter(n => n.is_favorite).length },
    { id: 'archived', label: 'Archived', icon: ArchiveBoxIcon, count: notes.filter(n => n.is_archived).length },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">NoteAI</h2>
            <div className="flex items-center space-x-1">
              <SparklesIcon className="w-3 h-3 text-purple-500" />
              <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">AI-Powered</span>
            </div>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-700'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{category.label}</span>
                </div>
                {category.count > 0 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive
                      ? 'bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {category.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Menu */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          <UserCircleIcon className="w-8 h-8 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">NoteAI Member</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 