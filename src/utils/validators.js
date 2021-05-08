export const validateRequired = value => {
  if (value === '' || value === undefined || value === null) {
    return false;
  }
  return true;
};
