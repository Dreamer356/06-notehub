import styles from "./SearchBox.module.css";

type Props = {
  query: string;
  onUpdate: (input: string) => void;
};

function FilterInput({ query, onUpdate }: Props) {
  return (
    <input
      type="search"
      className={styles.field}
      placeholder="Поиск заметок"
      value={query}
      onChange={e => onUpdate(e.target.value)}
      autoComplete="off"
    />
  );
}

export default FilterInput;
