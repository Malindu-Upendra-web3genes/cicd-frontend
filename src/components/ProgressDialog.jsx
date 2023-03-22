import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Stack, CircularProgress, Box } from '@mui/material';

function ProgressDialog({ open }) {
  return (
    <Dialog
      open={open}
      width={55}
      height={55}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }
      }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        width={55}
        height={55}
        bgcolor="transparent"
        boxShadow="-moz-initial">
        <CircularProgress color="primary" size={50} />
      </Stack>
    </Dialog>
  );
}

ProgressDialog.propTypes = {
  open: PropTypes.bool.isRequired
};

export default ProgressDialog;
