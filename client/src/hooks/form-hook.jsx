import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => { //state текущее состояние, action как изменить
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;// если поле отсутсвтует пропускаем его
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;// Проверяем валидность текущего изменяемого поля
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;// Проверяем валидность остальных полей
        }
      }
      return {
        ...state, // копируем все что есть
        inputs: {
          ...state.inputs,// создаем новую копию обьекта
          [action.inputId]: { value: action.value, isValid: action.isValid },
          //обновляем конкретного поля чье пришлов действие, action.value дает значение
        },
        isValid: formIsValid,
      };
      //Пример 
      // return {
      //   inputs: {
      //     name: { value: "John", isValid: true },
      //     email: { value: "john@example.com", isValid: false }
      //   },
      //   isValid: false // (потому что поле email невалидно)
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
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
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