type Props = {
  message: string;
};

function ErrorAlert({ message }: Props) {
  return (
    <div
      style={{
        color: "#e53935",
        textAlign: "center",
        fontWeight: 600,
        margin: "24px 0",
        letterSpacing: "0.5px",
      }}
      role="alert"
      aria-live="polite"
    >
      Ошибка: {message}
    </div>
  );
}

export default ErrorAlert;
