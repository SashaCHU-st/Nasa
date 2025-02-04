import { MaxUploadRate } from "axios";
import { useCallback, useReducer } from "react";

interface FormReducerState {
  inputs: {
    [key: string]: { value: string; isValid: boolean };
  };
  isValid: boolean;
}

type FormReducerAction =
  | {
      type: "INPUT_CHANGE";
      inputId: string;
      isValid: boolean;
      value: string;
    }
  | {
      type: "SET_DATA";
      inputs: { [key: string]: { value: string; isValid: boolean } };
      formIsValid: boolean;
    };
const formReducer = (
  state: FormReducerState,
  action: FormReducerAction
): FormReducerState => {
  // how state will change in depending of action
  switch (
    action.type // when changing
  ) {
    case "INPUT_CHANGE": // this is inoput case
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue; // skip if no field
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid; // check if both of them valid
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid; //check if both of them valid
          // so it will sort of update to state new  data when filling in
        }
      }
      return {
        ...state, //  copying new state
        inputs: {
          ...state.inputs, // craete new copy of objects
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
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

interface InitialInputs {
  [key: string]: { value: string; isValid: boolean };
}

export const useForm = (
  initialInputs: InitialInputs,
  initialFormValidity: boolean
): [// retrun type. UseFoprm return array with 3 elements: cur State of the form, funct
  // to update spec input fiels
  //function to set entire form state at once
  FormReducerState,
  (id: string, value: string, isValid: boolean) => void,
  (inputData: InitialInputs, formValidity: boolean) => void
] => {
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

  const inputHandler = useCallback((id:string, value:string, isValid:boolean) => {
    dispatch({
      // sending info to useRedecer, which is calling FormReducer and checking states
      type: "INPUT_CHANGE",
      inputId: id,
      value,
      isValid,
    });
  }, []);

  const setFormData = useCallback((inputData:InitialInputs, formValidity:boolean) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
