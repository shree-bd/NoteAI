import React from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import NoteCard from './NoteCard';
import { useNotes } from '../../contexts/NotesContext';

const NotesGrid = () => {
  const { filteredNotes, viewMode, loading, searchTerm, selectedCategory } = useNotes();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (filteredNotes.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-64 text-center"
      >
        <DocumentTextIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {searchTerm || selectedCategory !== 'all' ? 'No notes found' : 'No notes yet'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          {searchTerm 
            ? `No notes match your search for "${searchTerm}"`
            : selectedCategory !== 'all'
            ? `No notes in the ${selectedCategory} category yet`
            : 'Start creating your first note to get organized!'
          }
        </p>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} viewMode="list" />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {filteredNotes.map((note) => (
        <NoteCard key={note.id} note={note} viewMode="grid" />
      ))}
    </motion.div>
  );
};

export default NotesGrid; 