import React from 'react';
import PropTypes from 'prop-types';

function ModifyStatusDialog({
  open,
  setOpen,
  brand,
  setAlert,
  setMessage,
  setSeverity,
  setModBrand,
  setShowProgress
}) {
  return <div></div>;
}

ModifyStatusDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  brand: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setSeverity: PropTypes.func.isRequired,
  setModBrand: PropTypes.func.isRequired,
  setShowProgress: PropTypes.func.isRequired
};

export default ModifyStatusDialog;
