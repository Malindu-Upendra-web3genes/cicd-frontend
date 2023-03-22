import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Box } from '@mui/material';

function TextArea({ id, title, placeholder, label, value, onChange, error, helperText }) {
  return (
    <Stack gap={5} width="100%">
      <Box component="div" fontSize={14} color={error ? 'error.main' : 'black'}>
        {label}
      </Box>
      <Stack
        gap={5}
        height={150}
        justifyContent="center"
        bgcolor="white"
        borderRadius={2}
        border="1px solid"
        borderColor={error ? 'error.main' : 'black'}>
        <textarea
          id={id}
          title={title}
          placeholder={placeholder}
          style={{
            width: '100%',
            background: 'transparent',
            borderWidth: 0,
            outline: 'none',
            padding: 0,
            margin: 0,
            height: '100%',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '5px',
            paddingBottom: '5px',
            resize: 'none'
          }}
          value={value}
          onChange={onChange}
        />
      </Stack>
      {error ? (
        <Box component="div" fontSize={14} color="error.main">
          {helperText}
        </Box>
      ) : null}
    </Stack>
  );
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string
};

export default TextArea;
