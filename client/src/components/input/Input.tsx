import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';
import './Input.css';

interface InputState
{
  value:string;
  isValid:boolean;
  isTouched:boolean;
}

type InputAction =
  | { type: "CHANGE"; value: string; isValid: boolean }
  | { type: "TOUCH" }; // No additional payload needed for TOUCH action

const inputReducer = (state:InputState, action:InputAction):InputState => {
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

interface Validator
{
  type:string;
  value?:number;
}

interface InputProps
{
  id:string;
  type:string;
  value:string;
  valid:boolean;
  label:string;
  validators:Validator[];
  errorText?:string;
  onInput:(id:string,value:string,isValid:boolean) =>void

}

//dispatch function to send actions
const Input: React.FC<InputProps>= (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {// InputState cur.state of filed 
    value: props.value || "",//initial value
    isValid: props.valid || false,// is valid field
    isTouched: false,// was the filesd touched
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {// for sync with parent
    onInput(id, value, isValid);// in case values are changing send info to parent
    // on Input->inputHandler
  }, [id, value, isValid, onInput]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {// changing to change mode
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
        id={props.id}//name
        type={props.type}//text
        value={inputState.value}// current filed the value, and validirt
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