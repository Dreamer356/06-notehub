import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

// Типы для параметров создания заметки
interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

// Функция создания заметки — замените на ваш API вызов
async function createNote(data: CreateNoteParams): Promise<CreateNoteParams> {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create note");
  return response.json();
}

interface NoteFormProps {
  onCancel: () => void;
}

export const NoteForm = ({ onCancel }: NoteFormProps) => {
  const queryClient = useQueryClient();

  // useMutation с правильными типами
  const mutation = useMutation<CreateNoteParams, Error, CreateNoteParams>(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]); // Инвалидируем кэш по ключу "notes"
      onCancel(); // Закрываем форму после успешного создания заметки
    },
  });

  const initialValues: CreateNoteParams = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must not exceed 50 characters")
      .required("Title is required"),
    content: Yup.string().max(500, "Content must not exceed 500 characters"),
    tag: Yup.mixed<NoteTag>()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
      .required("Tag is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        mutation.mutate(values, {
          onSettled: () => setSubmitting(false),
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>

            <button type="submit" className={css.submitButton} disabled={isSubmitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
