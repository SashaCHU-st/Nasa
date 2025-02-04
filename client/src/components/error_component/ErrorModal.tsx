import React from "react";
import "./ErrorModal.css";

interface ErrorProps
{
  error:string;
  onClear: ()=>void;
}

const ErrorModal:React.FC<ErrorProps> = (props) => {//child component
  if (!props.error) {
    return null; // Ничего не отображаем, если ошибки нет
  }

  return (
    <div className="error-modal">
      <div className="error-modal__backdrop" onClick={props.onClear}></div>
      {/* <div className="error-modal__content" onCancel={props.onClear}>JUST TRY, can be deleted e.g when clicj outside of window... */}
        <header className="error-modal__header">
          <h2>An Error Occurred!</h2>
        </header>
        <div className="error-modal__body">
          <p>{props.error}</p> {/*here just which exactly error comes */}
        </div>
        <footer className="error-modal__footer">
          <button onClick={props.onClear}>Okay</button> {/*parent will uopdate error that will allow continue, by clicking okay button*/}
        </footer>
      </div>
    // </div>
  );
};

export default ErrorModal;

