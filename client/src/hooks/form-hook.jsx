import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => { // how state will change in depending of action
  switch (action.type) {// when changing
    case 'INPUT_CHANGE': // this is inoput case
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;// skip if no field
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;// check if both of them valid
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;//check if both of them valid
          // so it will sort of update to state new  data when filling in
        }
      }
      return {
        ...state, //  copying new state
        inputs: {
          ...state.inputs,// craete new copy of objects
          [action.inputId]: { value: action.value, isValid: action.isValid },
          //update fields with new value, e,g email
        },
        isValid: formIsValid,
      };
      // return {
      //   inputs: {
      //     name: { value: "J", isValid: true },
      //     email: { value: "jo", isValid: false }
      //   },
      //   isValid: false // (because not vaild email)
      // };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    // useReducer(reducer, initialStates) => reducer function takes cur.state and
    //change it to new state
    //UseReducer working with different cases, so in this case it it is input_change and set_data
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

// dispatch({// fucntion to send req to change state. it start to run reducer to change state
//Reducer takes cur.state and type, and based on this update the state
//   type: 'INPUT_CHANGE', // type
//   inputId: id,          // ID of the field
//   value,                // new value
//   isValid,              // validity
// });
// dispatch({
//   type: 'INPUT_CHANGE',
//   inputId: 'email',
//   value: 'newEmail@example.com',
//   isValid: true
// });// == action

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({// sending info to useRedecer, which is calling FormReducer and checking states
      type: 'INPUT_CHANGE',
      inputId: id,
      value,
      isValid,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};