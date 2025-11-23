import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

type Props = {
  totalPages: number;
  selectedPage: number;
  onSwitch: (newPage: number) => void;
};

function Pager({ totalPages, selectedPage, onSwitch }: Props) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={selectedPage - 1}
      breakLabel="…"
      previousLabel="⟨"
      nextLabel="⟩"
      onPageChange={({ selected }) => onSwitch(selected + 1)}
      containerClassName={styles.wrapper}
      pageClassName={styles.pageBtn}
      activeClassName={styles.selected}
      previousClassName={styles.prevArrow}
      nextClassName={styles.nextArrow}
      disabledClassName={styles.inactive}
    />
  );
}

export default Pager;
