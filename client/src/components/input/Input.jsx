import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': // chaning cur.state to new one
      return {
        ...state,
        value: action.value,//update value
        isValid: action.isValid,// upodate validity
      };
    case 'TOUCH':// e.g when user touch but still did not write anything
    // means that they cannot leave it like that (empty, or not valid etc)
      return {
        ...state,
        isTouched: true,// "active"
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {// InputState cur.state of filed 
    value: props.value || '',
    isValid: props.valid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {// for sync with parent
    onInput(id, value, isValid);// in case values are changing send info to parent
    // on Input->inputHandler
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {// changing to change mode
    dispatch({
      type: 'CHANGE',// calls with CHANGE type
      value: event.target.value,// and sends new value
      isValid: validate(event.target.value, props.validators),
    });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });// if it is been touched, in case of error can send error message
  };

  return (
    <div className={`input-wrapper ${!inputState.isValid && inputState.isTouched && 'input-invalid'}`}>
      <input
        id={props.id}
        type={props.type}
        value={inputState.value}// current filed
        onChange={changeHandler}///user write smth
        onBlur={touchHandler}// when user will touch
        className="input-field"
      />
      <label htmlFor={props.id} className={`input-label ${value && 'input-label-active'}`}>
        {props.label}
      </label>
      {!inputState.isValid && inputState.isTouched && <p className="error-text">{props.errorText}</p>}
      {/*e.g when user touched and left field*/}
    </div>
  );
};

export default Input;