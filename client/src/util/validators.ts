const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

interface ValItems{
  type:string;
  val?:number;
}


export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (minLength: number):ValItems => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val:minLength,
});
export const VALIDATOR_MAXLENGTH = (maxLength: number):ValItems => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val:maxLength,
});
export const VALIDATOR_MIN = ():ValItems => ({ type: VALIDATOR_TYPE_MIN });
export const VALIDATOR_MAX = ():ValItems => ({ type: VALIDATOR_TYPE_MAX });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

interface Validator
{
  type:string;
  val?:number;
}

// interface ValidateProps
// {
//   value:string;
//   validators:Validator[];
// }

export const validate = (value:string, validators:Validator[]):boolean => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH && validator.val !== undefined) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH && validator.val !== undefined) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN && validator.val !== undefined) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX && validator.val !== undefined) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
