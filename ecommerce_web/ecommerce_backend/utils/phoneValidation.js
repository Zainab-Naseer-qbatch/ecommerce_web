export const validatePhone = (phone) => {
  let pattern = /^[+][0-9]{12,13}$/;
  if (phone.match(pattern)) {
    return true;
  } else {
    return false;
  }
};
