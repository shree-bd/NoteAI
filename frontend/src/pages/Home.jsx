import React from 'react';
import Layout from '../components/Layout/Layout';
import NotesGrid from '../components/Notes/NotesGrid';
import NoteEditor from '../components/Notes/NoteEditor';
import { useNotes } from '../contexts/NotesContext';

function Home() {
  const { isCreating, setIsCreating, selectedNote, selectNote } = useNotes();

  const handleCloseEditor = () => {
    setIsCreating(false);
    selectNote(null);
  };

  return (
    <Layout>
      <div className="p-6">
        <NotesGrid />
      </div>
      
      <NoteEditor
        isOpen={isCreating || Boolean(selectedNote)}
        onClose={handleCloseEditor}
        note={selectedNote}
      />
    </Layout>
  );
}

export default Home;
