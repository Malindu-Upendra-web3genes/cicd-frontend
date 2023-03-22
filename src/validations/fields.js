const validateRequiredString = (field, setErr, setHelper) => {
  let isErr = false;
  let errText = '';
  if (!field.trim().length) {
    isErr = true;
    errText = 'Required';
  }
  setErr(isErr);
  setHelper(errText);
  return !isErr;
};

const validateEmail = (field, setErr, setHelper) => {
  let isErr = false;
  let errText = '';
  if (!field.trim().length) {
    isErr = true;
    errText = 'Required';
  }
  setErr(isErr);
  setHelper(errText);
  return !isErr;
};

const validateDateRange = (from, setFromErr, setFromHelper, to, setToErr, setToHelper) => {
  let isErr = false;
  let fromErr = false;
  let fromHelper = '';
  let toErr = false;
  let toHelper = '';

  if (!from.length) {
    isErr = fromErr = true;
    fromHelper = 'Required';
  } else if (isNaN(Date.parse(from))) {
    isErr = fromErr = true;
    fromHelper = 'Invalid date';
  } else if (new Date(from) > Date.now()) {
    isErr = fromErr = true;
    fromHelper = 'Cannot exceed current date';
  } else if (!to.length) {
    isErr = toErr = true;
    toHelper = 'Required';
  } else if (isNaN(Date.parse(to))) {
    isErr = toErr = true;
    toHelper = 'Invalid date';
  } else if (new Date(to) > Date.now()) {
    isErr = toErr = true;
    toHelper = 'Cannot exceed current date';
  } else if (new Date(from) > new Date(to)) {
    isErr = toErr = true;
    toHelper = 'To date must be greater than or equal to from date';
  }
  setFromErr(fromErr);
  setFromHelper(fromHelper);
  setToErr(toErr);
  setToHelper(toHelper);
  return !isErr;
};

const validateFile = (files, setInputErr, setInputHelper) => {
  let isErr = false;
  let errText = '';
  if (!files.length) {
    isErr = true;
    errText = 'Must select a file';
  }
  setInputErr(isErr);
  setInputHelper(errText);
  return !isErr;
};

export { validateEmail, validateRequiredString, validateDateRange, validateFile };
