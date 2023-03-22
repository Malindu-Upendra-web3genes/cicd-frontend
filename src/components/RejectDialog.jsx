import React, { useState } from 'react';
import { Dialog, Box, Button, Typography, Stack, TextareaAutosize } from '@mui/material';
import { WarningAmberOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import TextArea from './TextArea';

function RejectDialog({
  open,
  setOpen,
  title,
  onConfirm,
  rejReason,
  setRejReason,
  message,
  okLabel,
  cancelLabel
}) {
  const _handleRejReasonChange = (e) => {
    setRejReason(e.target.value);
  };

  return (
    <Dialog open={open} PaperProps={{ style: { borderRadius: 4 } }}>
      <Stack>
        <Stack direction="row" alignItems="center" px={30} py={20} bgcolor="error.main" gap={15}>
          <Stack color="white">
            <WarningAmberOutlined />
          </Stack>
          <Typography color="white">{title}</Typography>
        </Stack>
        <Stack padding={30} gap={30}>
          <Box display={message ? 'flex' : 'none'} flexDirection="column" justifyContent="start">
            <Typography>{message}</Typography>
          </Box>
          <TextArea
            id="rejReason"
            title="rejReason"
            label="Description"
            placeholder=""
            value={rejReason}
            onChange={_handleRejReasonChange}
          />
          <Stack direction="row" justifyContent="end" gap={30}>
            <Button onClick={() => setOpen(false)} variant="outlined" color="error">
              {cancelLabel ? cancelLabel : 'No'}
            </Button>
            <Button
              disabled={rejReason.trim() === '' ? true : false}
              onClick={onConfirm}
              variant="contained"
              color="error">
              {okLabel ? okLabel : 'Yes'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}

RejectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  rejReason: PropTypes.string.isRequired,
  setRejReason: PropTypes.func.isRequired,
  message: PropTypes.string,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string
};

export default RejectDialog;
