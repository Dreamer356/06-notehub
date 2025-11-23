import type { Note } from "../../types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export const NoteList = ({ notes, onDelete }: NoteListProps) => (
  <ul className={styles.list}>
    {notes.map(({ id, title, content, tag }) => (
      <li key={id} className={styles.listItem}>
        <article>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.content}>{content}</p>
          <footer className={styles.footer}>
            <span className={styles.tag}>{tag}</span>
            <button
              className={styles.button}
              aria-label={`Delete note titled ${title}`}
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </footer>
        </article>
      </li>
    ))}
  </ul>
);
