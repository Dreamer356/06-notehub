import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes, createNote, deleteNote } from "../../services/noteService";

import { NoteList } from "../NoteList/NoteList";
import { SearchBox } from "../SearchBox/SearchBox";
import { Pagination } from "../Pagination/Pagination";
import { Modal } from "../Modal/Modal";
import { NoteForm } from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import styles from "./App.module.css";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [debouncedInput] = useDebounce(searchTerm, 500);

  const client = useQueryClient();

  const {
    data: notesData,
    isLoading: loadingNotes,
    isError: notesError,
    error: notesErrorObj,
  } = useQuery({
    queryKey: ["notes", currentPage, debouncedInput],
    queryFn: () => fetchNotes(currentPage, debouncedInput),
    placeholderData: prev => prev,
  });

  const addNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["notes"] });
      setModalVisible(false);
    },
  });

  const removeNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const onSearchChange = val => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const onPagination = num => setCurrentPage(num);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={searchTerm} onChange={onSearchChange} />

        {notesData && notesData.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={notesData.totalPages}
            onPageChange={onPagination}
          />
        )}

        <button className={styles.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {loadingNotes && <Loader />}
      {notesError && (
        <ErrorMessage message={notesErrorObj?.message || "Unknown error"} />
      )}

      {notesData && notesData.notes.length > 0 && (
        <NoteList notes={notesData.notes} onDelete={removeNoteMutation.mutate} />
      )}

      {modalVisible && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} onSubmit={addNoteMutation.mutate} />
        </Modal>
      )}
    </div>
  );
}

export default App;
