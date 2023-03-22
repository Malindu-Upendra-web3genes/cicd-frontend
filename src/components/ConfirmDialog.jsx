import React from 'react';
import { Dialog, Box, Button, Typography, Stack } from '@mui/material';
import { HelpOutlineOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';

function ConfirmDialog({ open, setOpen, title, onConfirm, message, okLabel, cancelLabel }) {
  return (
    <Dialog open={open} PaperProps={{ style: { borderRadius: 4 } }}>
      <Stack>
        <Stack direction="row" alignItems="center" px={30} py={20} bgcolor="primary.main" gap={15}>
          <Stack color="white">
            <HelpOutlineOutlined />
          </Stack>
          <Typography color="white">{title}</Typography>
        </Stack>
        <Stack padding={30} gap={30}>
          <Box display={message ? 'flex' : 'none'} flexDirection="column" justifyContent="start">
            {message}
          </Box>
          <Stack direction="row" justifyContent="end" gap={30}>
            <Button onClick={() => setOpen(false)} variant="outlined">
              {cancelLabel ? cancelLabel : 'No'}
            </Button>
            <Button onClick={() => onConfirm()} variant="contained">
              {okLabel ? okLabel : 'Yes'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string
};

export default ConfirmDialog;
