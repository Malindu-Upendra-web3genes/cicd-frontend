const validateAdd = (values) => {
  console.log('validateAdd');
  const errors = {};
  if (!values.name.trim().length) {
    errors.name = 'Required';
  }

  if (!values.categories.length) {
    errors.categories = 'Must select at least one category';
  }

  if (!values.image.file) {
    errors.image = 'Select image';
  } else if (!values.image.modFile) {
    errors.image = 'Save changes';
  }

  return errors;
};

const validateModify = (values) => {
  console.log('validateAdd');
  const errors = {};
  if (!values.name.trim().length) {
    errors.name = 'Required';
  }

  if (!values.image.src) {
    if (!values.image.file) {
      errors.image = 'Select image';
    } else if (!values.image.modFile) {
      errors.image = 'Save changes';
    }
  }

  return errors;
};

export { validateAdd, validateModify };
