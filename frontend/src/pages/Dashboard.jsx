import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import NotesGrid from '../components/Notes/NotesGrid';
import NoteEditor from '../components/Notes/NoteEditor';

const Dashboard = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleNewNote = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  return (
    <Layout onNewNote={handleNewNote}>
      <NotesGrid onEditNote={handleEditNote} />
      
      <NoteEditor
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        note={editingNote}
      />
    </Layout>
  );
};

export default Dashboard; 