import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Alert, AlertTitle } from '@mui/material';
import { SEV_INFO, SEV_SUCCESS, SEV_WARNING, SEV_ERROR } from '../constants/severities';

function AlertBox({ open, severity, message, setOpen, title, top, left, right, bottom }) {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      display={open ? 'flex' : 'none'}
      position="fixed"
      left={left}
      top={top}
      right={right}
      bottom={bottom}
      alignItems="center"
      zIndex={3}>
      <Alert
        variant="filled"
        severity={severity || SEV_INFO}
        onClose={onClose}
        sx={{ borderRadius: 5 }}>
        {title ? <AlertTitle>{title}</AlertTitle> : null}
        {message}
      </Alert>
    </Stack>
  );
}

AlertBox.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.oneOf(['', SEV_INFO, SEV_SUCCESS, SEV_WARNING, SEV_ERROR]).isRequired,
  message: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default AlertBox;
