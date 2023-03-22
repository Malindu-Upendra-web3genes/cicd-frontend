import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Stack, Typography, Box, FormControl, FormHelperText, Button, Input } from '@mui/material';
import PropTypes from 'prop-types';
import { FileUploadOutlined } from '@mui/icons-material';

function Droparea({
  accept,
  maxSize,
  maxFiles,
  noClick,
  setInputHelper,
  setFiles,
  inputHelper,
  title
}) {
  const onDropAccepted = useCallback((acceptedFiles) => {
    setInputHelper('');
    setFiles(acceptedFiles);
  }, []);

  const onDropRejected = useCallback((fileRejections) => {
    setFiles([]);
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        let errText = err.message;
        if (err.code === 'file-too-large') {
          errText = `Maximum upload file size: ${Math.round(maxSize / 1048576)} MB`;
        }
        if (err.code === 'file-invalid-type') {
          errText = err.message;
        }

        setInputHelper(errText);
      });
    });
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept,
    maxSize,
    maxFiles,
    noClick,
    onDropAccepted,
    onDropRejected
  });

  const _handleBrowse = async () => {
    setFiles([]);
    setInputHelper('');
    open();
  };

  return (
    <Stack alignItems="center" width="100%" gap={15}>
      <Stack width="100%">
        <Typography fontWeight={500} fontSize={12} color="#00000099">
          {title}
        </Typography>
      </Stack>
      <FormControl fullWidth>
        <Stack
          alignItems="center"
          justifyContent="center"
          borderRadius={1}
          border="dashed"
          borderColor="#00000099"
          width="100%"
          padding={30}
          gap={30}
          bgcolor="#F7F7F7">
          <Stack
            alignItems="center"
            justifyContent="center"
            gap={10}
            {...getRootProps()}
            width="100%">
            <Input {...getInputProps()} />
            <Stack alignItems="center">
              <Box color="#1C1B1F99">
                <FileUploadOutlined />
              </Box>
              <Typography fontSize={14} color="#00000099">
                Drag and Drop here
              </Typography>
              <Typography fontSize={14} color="#00000099">
                or
              </Typography>
            </Stack>
            <Button
              onClick={_handleBrowse}
              variant="contained"
              sx={{
                backgroundColor: '#0744ED',
                ':hover': { bgcolor: '#0744ED' },
                minWidth: 85
              }}>
              Browse file
            </Button>
          </Stack>
        </Stack>
        <FormHelperText sx={{ color: 'error.main' }}>{inputHelper}</FormHelperText>
      </FormControl>
      <Stack width="100%">
        <Typography fontWeight={500} fontSize={12} color="#00000099">
          maximum upload file size: {Math.round(maxSize / 1048576)} MB
        </Typography>
      </Stack>
    </Stack>
  );
}

Droparea.propTypes = {
  accept: PropTypes.object.isRequired,
  maxSize: PropTypes.number.isRequired,
  maxFiles: PropTypes.number.isRequired,
  setInputHelper: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
  noClick: PropTypes.bool.isRequired,
  inputHelper: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Droparea;
