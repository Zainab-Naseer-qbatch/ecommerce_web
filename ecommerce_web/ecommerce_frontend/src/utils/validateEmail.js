import validator from "validator";
export const validateEmail = (e) => {
  const isValid = validator.isEmail(e.target.value);
  if (e.target.value) {
    if (!isValid) {
      return "enter a valid email address!";
    } else {
      return null;
    }
  } else {
    return null;
  }
};
