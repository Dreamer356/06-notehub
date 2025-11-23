import type { Note } from "../../types/note";
import styles from "./NoteList.module.css";

type Props = {
  notes: Note[];
  onDelete: (id: string) => void;
};

function NotesView({ notes, onDelete }: Props) {
  return (
    <section className={styles.container}>
      <ul className={styles.items}>
        {notes.map((note) => (
          <li key={note.id} className={styles.card}>
            <header className={styles.header}>
              <h3 className={styles.heading}>{note.title}</h3>
            </header>
            <main className={styles.body}>
              <p className={styles.text}>{note.content}</p>
            </main>
            <footer className={styles.actions}>
              <span className={styles.label}>{note.tag}</span>
              <button
                className={styles.remove}
                onClick={() => onDelete(note.id)}
              >
                Удалить
              </button>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default NotesView;
