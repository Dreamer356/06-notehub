import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";

import type { NoteTag } from "../../types/note";
import styles from "./NoteForm.module.css";

type Props = {
  onSubmit: (note: {
    title: string;
    content: string;
    tag: NoteTag;
  }) => void;
  onCancel: () => void;
};

const defaultValues = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

const schema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Минимум 3 символа")
    .max(50, "Максимум 50 символов")
    .required("Поле обязательно"),
  content: Yup.string()
    .max(500, "Максимум 500 символов"),
  tag: Yup.mixed<NoteTag>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Некорректный тег")
    .required("Обязательный тег"),
});

function NoteDialog({ onSubmit, onCancel }: Props) {
  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={schema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form className={styles.panel}>
          <div className={styles.group}>
            <label htmlFor="title">Заголовок</label>
            <Field id="title" name="title" type="text" className={styles.input} />
            <FormikError name="title" component="span" className={styles.error} />
          </div>

          <div className={styles.group}>
            <label htmlFor="content">Описание</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={6}
              className={styles.textarea}
            />
            <FormikError name="content" component="span" className={styles.error} />
          </div>

          <div className={styles.group}>
            <label htmlFor="tag">Метка</label>
            <Field as="select" id="tag" name="tag" className={styles.select}>
              {["Todo", "Work", "Personal", "Meeting", "Shopping"].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Field>
            <FormikError name="tag" component="span" className={styles.error} />
          </div>

          <div className={styles.row}>
            <button type="button" className={styles.cancel} onClick={onCancel}>
              Отмена
            </button>
            <button
              type="submit"
              className={styles.submit}
              disabled={isSubmitting}
            >
              Сохранить
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NoteDialog;
