import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Alert, Box, Snackbar } from '@mui/material';
import { SEV_ERROR, SEV_SUCCESS, SEV_WARNING } from '../constants/severities';

function AlertToast({ open, type, message, setOpen, hideAfter, anchorOrigin }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={hideAfter}
      onClose={() => setOpen(false)}
      sx={{ zIndex: 3 }}
      anchorOrigin={anchorOrigin}>
      {(() => {
        switch (type) {
          case SEV_SUCCESS:
            return (
              <Alert variant="filled" severity="success" onClose={() => setOpen(false)}>
                {message}
              </Alert>
            );
          case SEV_ERROR:
            return (
              <Alert variant="filled" severity="error" onClose={() => setOpen(false)}>
                {message}
              </Alert>
            );
          case SEV_WARNING:
            return (
              <Alert variant="filled" severity="warning" onClose={() => setOpen(false)}>
                {message}
              </Alert>
            );
          default:
            return (
              <Alert variant="filled" severity="info" onClose={() => setOpen(false)}>
                {message}
              </Alert>
            );
        }
      })()}
    </Snackbar>
  );
}

AlertToast.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  hideAfter: PropTypes.number.isRequired,
  anchorOrigin: PropTypes.object.isRequired
};

export default AlertToast;
