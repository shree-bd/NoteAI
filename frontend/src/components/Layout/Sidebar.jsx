import React from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  SunIcon, 
  MoonIcon,
  HomeIcon,
  TagIcon,
  StarIcon,
  ArchiveBoxIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotes } from '../../contexts/NotesContext';

const Sidebar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { 
    searchTerm, 
    searchNotes, 
    selectedCategory, 
    selectCategory, 
    setIsCreating,
    filteredNotes 
  } = useNotes();

  const categories = [
    { id: 'all', name: 'All Notes', icon: HomeIcon, count: filteredNotes.length },
    { id: 'work', name: 'Work', icon: TagIcon, count: 0 },
    { id: 'personal', name: 'Personal', icon: TagIcon, count: 0 },
    { id: 'ideas', name: 'Ideas', icon: TagIcon, count: 0 },
    { id: 'favorites', name: 'Favorites', icon: StarIcon, count: 0 },
    { id: 'archived', name: 'Archived', icon: ArchiveBoxIcon, count: 0 },
  ];

  return (
    <div className="sidebar">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <h1 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
            NotesApp
          </h1>
        </div>

        {/* New Note Button */}
        <button
          onClick={() => setIsCreating(true)}
          className="w-full flex items-center justify-center space-x-2 btn-primary mb-6"
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Note</span>
        </button>

        {/* Search */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => searchNotes(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <nav className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => selectCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{category.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isSelected 
                      ? 'bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 