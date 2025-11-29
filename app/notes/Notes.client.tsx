'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, createNote, deleteNote } from '../../lib/api';
import { Note } from '../../types/note';
import { useState } from 'react';
import Link from 'next/link';
import css from './Notes.module.css';

export default function NotesClient() {
  const qc = useQueryClient();
  const { data: notes, isLoading, error } = useQuery<Note[], Error>(['notes'], fetchNotes);

  const [query, setQuery] = useState('');

  async function handleCreate() {
    const title = `New note ${Date.now()}`;
    const content = 'Some content';
    try {
      await createNote({ title, content });
      qc.invalidateQueries(['notes']);
    } catch (err) {
      console.error(err);
      alert('Create failed');
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteNote(id);
      qc.invalidateQueries(['notes']);
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  }

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  if (!notes) return <p>No notes found.</p>;

  const filtered = notes.filter(n => n.title.toLowerCase().includes(query.toLowerCase()) || n.content.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={css.container}>
      <div className={css.controls}>
        <input placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
        <button onClick={handleCreate}>Create note</button>
      </div>

      <ul className={css.list}>
        {filtered.map(n => (
          <li key={n.id} className={css.item}>
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <div className={css.actions}>
              <Link href={`/notes/${n.id}`}>View details</Link>
              <button onClick={() => handleDelete(n.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
