import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

function Dialog({ onClose, children }: Props) {
  useEffect(() => {
    function escHandler(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [onClose]);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.window} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Dialog;
