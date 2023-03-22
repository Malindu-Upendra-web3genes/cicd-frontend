import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Alert, AlertTitle, Stack } from '@mui/material';
import {
  VARIANT_ERROR,
  VARIANT_INFO,
  VARIANT_SUCCESS,
  VARIANT_WARNING
} from '../constants/variants';

function AlertDialog({ open, variant, message, onClose, title }) {
  return (
    <Dialog open={open} onClose={onClose}>
      {(() => {
        switch (variant) {
          case VARIANT_SUCCESS:
            return (
              <Stack minWidth={{ sm: 395, xs: 275 }}>
                <Alert variant="filled" severity="success" onClose={onClose}>
                  <AlertTitle>{title ? title : 'Success'}</AlertTitle>
                  {message}
                </Alert>
              </Stack>
            );
          case VARIANT_ERROR:
            return (
              <Stack minWidth={{ sm: 395, xs: 275 }}>
                <Alert variant="filled" severity="error" onClose={onClose}>
                  <AlertTitle>{title ? title : 'Error'}</AlertTitle>
                  {message}
                </Alert>
              </Stack>
            );
          case VARIANT_WARNING:
            return (
              <Stack minWidth={{ sm: 395, xs: 275 }}>
                <Alert variant="filled" severity="warning" onClose={onClose}>
                  <AlertTitle>{title ? title : 'Warning'}</AlertTitle>
                  {message}
                </Alert>
              </Stack>
            );
          case VARIANT_INFO:
            return (
              <Stack minWidth={{ sm: 395, xs: 275 }}>
                <Alert variant="filled" severity="info" onClose={onClose}>
                  <AlertTitle>{title ? title : 'Info'}</AlertTitle>
                  {message}
                </Alert>
              </Stack>
            );
        }
      })()}
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default AlertDialog;
