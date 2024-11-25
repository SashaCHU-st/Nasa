import React from "react";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  if (!props.error) {
    return null; // Ничего не отображаем, если ошибки нет
  }

  return (
    <div className="error-modal">
      <div className="error-modal__backdrop" onClick={props.onClear}></div>
      <div className="error-modal__content" onCancel={props.onClear}>
        <header className="error-modal__header">
          <h2>An Error Occurred!</h2>
        </header>
        <div className="error-modal__body">
          <p>{props.error}</p>
        </div>
        <footer className="error-modal__footer">
          <button onClick={props.onClear}>Okay</button>
        </footer>
      </div>
    </div>
  );
};

export default ErrorModal;

