import { validateEmail, validateFile, validateRequiredString, validateMfile } from './fields';

const validateAddUser = (
  firstName,
  setFirstNameErr,
  setFirstNameHelper,
  lastName,
  setLastNameErr,
  setLastNameHelper,
  email,
  setEmailErr,
  setEmailHelper
) => {
  let error = true;
  const isValidFirstName = validateRequiredString(firstName, setFirstNameErr, setFirstNameHelper);
  const isValidLastName = validateRequiredString(lastName, setLastNameErr, setLastNameHelper);
  const isValidEmail = validateEmail(email, setEmailErr, setEmailHelper);

  if (isValidFirstName && isValidLastName && isValidEmail) {
    error = false;
  }
  return error;
};

const validateImage = (image, setErr, setHelper) => {
  let isErr = false;
  let errText = '';
  if (!image.src && !image.file) {
    isErr = true;
    errText = 'Select image';
  } else if (image.file && !image.modFile) {
    isErr = true;
    errText = 'Save changes';
  }
  setErr(isErr);
  setHelper(errText);
  return !isErr;
};

const validateAddCategory = (
  name,
  setNameErr,
  setNameHelper,
  image,
  setInputErr,
  setInputHelper
) => {
  let error = true;
  const isValidName = validateRequiredString(name, setNameErr, setNameHelper);
  const isValidFile = validateImage(image, setInputErr, setInputHelper);

  if (isValidName && isValidFile) {
    error = false;
  }
  return error;
};

export { validateAddUser, validateAddCategory };
