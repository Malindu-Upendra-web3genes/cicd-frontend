import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Stack, Box, Typography, CircularProgress } from '@mui/material';

function DeterminateProgress({ open, progress, label }) {
  return (
    <Dialog
      open={open}
      width={55}
      height={55}
      hideBackdrop
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }
      }}>
      <Stack alignItems="center" gap={10}>
        <Box display="inline-flex" position="relative" width={51} height={51}>
          <CircularProgress color="primary" size={50} variant="determinate" value={progress} />
          <Stack
            position="absolute"
            left={0}
            top={0}
            right={0}
            bottom={0}
            alignItems="center"
            justifyContent="center">
            <Typography component="div" variant="caption" color="primary.main">
              {`${progress}%`}
            </Typography>
          </Stack>
        </Box>
        {label ? (
          <Typography component="div" variant="caption" color="primary.main">
            {label}
          </Typography>
        ) : null}
      </Stack>
    </Dialog>
  );
}

DeterminateProgress.propTypes = {
  open: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  label: PropTypes.string
};

export default DeterminateProgress;
