import axios from 'axios';
import { Note } from '../types/note';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL ?? '/',
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : undefined,
    'Content-Type': 'application/json',
  },
});

// Fetch list of notes
export async function fetchNotes(): Promise<Note[]> {
  const { data } = await axiosInstance.get<Note[]>('/notes');
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(note: Omit<Note, 'id' | 'createdAt'>): Promise<Note> {
  const { data } = await axiosInstance.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await axiosInstance.delete(`/notes/${id}`);
}
