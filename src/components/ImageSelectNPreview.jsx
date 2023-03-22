import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Stack, Box, IconButton, Typography, Input, Button, Skeleton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import {
  Backup,
  DeleteOutlined,
  SaveOutlined,
  TransformOutlined,
  UndoOutlined
} from '@mui/icons-material';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../functions/cropper';
import ArContainer from './ArContainer';

function ImageSelectNPreview({
  image,
  setImage,
  err,
  setErr,
  helper,
  setHelper,
  maxSize,
  label,
  aspectRatio,
  pt
}) {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [srcLoaded, setSrcLoaded] = useState(false);

  const onLoadImage = () => {
    setSrcLoaded(true);
  };

  const setCrop = (crop) => {
    setImage({ ...image, crop });
  };

  const setZoom = (zoom) => {
    setImage({ ...image, zoom });
  };

  const reset = () => {
    setCroppedAreaPixels(null);
    setImageSrc(null);
    setSrcLoaded(false);
    setImage({
      src: '',
      file: null,
      modFile: null,
      lastModFile: null,
      crop: {
        x: 0,
        y: 0
      },
      zoom: 1
    });
  };

  const onDropAccepted = (acceptedFiles) => {
    setErr(false);
    setHelper('');
    setImageSrc(URL.createObjectURL(acceptedFiles[0]));
    setImage({ ...image, file: acceptedFiles[0] });
  };

  const onDropRejected = (fileRejections) => {
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        let errText = err.message;
        if (err.code === 'file-too-large') {
          errText = `Maximum upload file size: ${Math.round(maxSize / 1048576)} MB`;
        }
        if (err.code === 'file-invalid-type') {
          errText = err.message;
        }
        setErr(true);
        setHelper(errText);
      });
    });
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize,
    multiple: false,
    noClick: true,
    onDropAccepted,
    onDropRejected
  });

  const _handleBrowse = async () => {
    setErr(false);
    setHelper('');
    open();
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      setErr(false);
      setHelper('');

      let blob = await getCroppedImg(URL.createObjectURL(image.file), croppedAreaPixels);
      const modFile = new File([blob], image.file.name, {
        type: blob.type
      });

      setImage({ ...image, modFile, lastModFile: modFile });
    } catch (e) {
      console.error(e);
    }
  };

  const _handleUndo = () => {
    if (image.lastModFile) {
      setImage({ ...image, modFile: image.lastModFile });
    } else {
      reset();
    }
  };

  const _handleRePosition = () => {
    setImage({ ...image, modFile: null });
  };

  const _handleRemoveImage = () => {
    reset();
  };

  return (
    <Stack gap={5}>
      {label ? (
        <Box fontSize={14} color={err ? 'error.main' : 'black'}>
          {label}
        </Box>
      ) : null}
      <ArContainer pt={pt}>
        {image.src || image.modFile ? (
          <Box position="relative" height="100%">
            <img
              width="100%"
              height="100%"
              alt="Category image"
              src={image.src || URL.createObjectURL(image.modFile)}
              onLoad={onLoadImage}
            />
            <Box display={srcLoaded ? 'block' : 'none'} position="absolute" bottom={10} right={10}>
              <Stack
                position="relative"
                direction="row"
                px={10}
                py={5}
                gap={5}
                bgcolor="white"
                borderRadius={5}>
                {image.file ? (
                  <IconButton
                    title="crop image"
                    size="small"
                    color="primary"
                    onClick={_handleRePosition}>
                    <TransformOutlined fontSize="small" />
                  </IconButton>
                ) : null}
                <IconButton
                  title="delete image"
                  size="small"
                  color="primary"
                  onClick={_handleRemoveImage}>
                  <DeleteOutlined fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
            <Box
              display={srcLoaded ? 'none' : 'block'}
              position="absolute"
              left={0}
              top={0}
              right={0}
              bottom={0}>
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </Box>
          </Box>
        ) : !image.file ? (
          <Box
            height="100%"
            color={err ? 'error.main' : 'text.secondary'}
            border="dashed"
            borderRadius={1}
            p={2}
            bgcolor="background.secondary">
            <Stack
              height="100%"
              alignItems="center"
              justifyContent="center"
              gap={5}
              {...getRootProps()}>
              <Box display="none">
                <input {...getInputProps()} />
              </Box>
              <Backup fontSize="medium" />
              <Typography fontSize={14} textAlign="center">
                Drag & Drop to Upload File
              </Typography>
              <Typography fontSize={12}>OR</Typography>
              <Button variant="text" color="disabled" onClick={_handleBrowse} size="small">
                Browse file
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box position="relative" height="100%">
            <Cropper
              image={imageSrc}
              crop={image.crop}
              zoom={image.zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              objectFit="auto-cover"
            />
            <Box position="absolute" bottom={15} right={10}>
              <Stack direction="row" px={10} py={5} gap={5} bgcolor="white" borderRadius={5}>
                <IconButton size="small" color="primary" onClick={_handleUndo}>
                  <UndoOutlined fontSize="small" />
                </IconButton>
                <IconButton size="small" color="primary" onClick={cropImage}>
                  <SaveOutlined fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        )}
      </ArContainer>
      {helper ? (
        <Typography fontSize={12} color={err ? 'error.main' : 'info.main'}>
          {helper}
        </Typography>
      ) : null}
    </Stack>
  );
}

ImageSelectNPreview.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
    file: PropTypes.object,
    modFile: PropTypes.object,
    lastModFile: PropTypes.object,
    crop: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    zoom: PropTypes.number.isRequired
  }).isRequired,
  setImage: PropTypes.func.isRequired,
  err: PropTypes.bool.isRequired,
  setErr: PropTypes.func.isRequired,
  helper: PropTypes.string.isRequired,
  setHelper: PropTypes.func.isRequired,
  maxSize: PropTypes.number,
  label: PropTypes.string,
  aspectRatio: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  pt: PropTypes.string
};

ImageSelectNPreview.defaultProps = {
  maxSize: 104857600,
  aspectRatio: 1,
  pt: '100%'
};

export default ImageSelectNPreview;
