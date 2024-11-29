import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': // меняет текущее щзначение на основе что выслано
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case 'TOUCH':// дотронуто,  в случае ошибки
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isValid: props.valid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {// обработчик событий
    dispatch({
      type: 'CHANGE',// вызывает dispactcj с типой CHANGE 
      value: event.target.value,// и перелдает новвое значение
      isValid: validate(event.target.value, props.validators),
    });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });// передает новое значение для того чтобы если оно длотронуто то уже модно распознаваит что ввелись оишибки если оно пустое
    
  };

  return (
    <div className={`input-wrapper ${!inputState.isValid && inputState.isTouched && 'input-invalid'}`}>
      <input
        id={props.id}
        type={props.type}
        value={inputState.value}
        onChange={changeHandler}
        onBlur={touchHandler}
        className="input-field"
      />
      <label htmlFor={props.id} className={`input-label ${value && 'input-label-active'}`}>
        {props.label}
      </label>
      {!inputState.isValid && inputState.isTouched && <p className="error-text">{props.errorText}</p>}
    </div>
  );
};

export default Input;