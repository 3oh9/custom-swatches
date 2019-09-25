export const validate = (validation, value) => {
  let isValid;
  let yearsOld;
  switch (validation.type) {
    case 'email':
      isValid = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(value);
      break;
    case 'number':
      isValid = !(/[^\d,]/g.test(value));
      break;
    case 'tel':
      isValid = /^(.{4})(.*)(.{6})$/g.test(value);
      break;
    case 'comparePasswords':
      isValid = value && value.newPassword === value.confirmPassword;
      break;
    case 'isRequired':
      isValid = value !== '' && value !== null && value;
      break;
    case 'minSize':
      isValid = value && parseFloat(value) >= validation.condition;
      break;
    case 'maxSize':
      isValid = value && value.length <= validation.condition;
      break;
    case 'minNumberSize':
      isValid = value && parseFloat(value) >= validation.condition;
      break;
    default:
      break;
  }
  if (!isValid) {
    return validation;
  }
  return null;
};

export default {
  validate
};
