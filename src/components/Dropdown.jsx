import React, { useState, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

function Dropdown({ error, label, title, data, value, defaultValue, onChange, helperText }) {
  const [borderColor, setBorderColor] = useState('');

  useEffect(() => {
    setBorderColor(error ? '#d32f2f' : 'black');
  }, [error]);

  return (
    <Stack width="100%" gap={5}>
      {label ? (
        <Box fontSize={14} color={error ? 'error.main' : 'black'}>
          {label}
        </Box>
      ) : null}
      <Stack
        height={35}
        bgcolor="white"
        justifyContent="center"
        borderRadius={2}
        px={10}
        border={`1px solid ${borderColor}`}>
        <select
          title={title}
          value={value}
          onChange={onChange}
          style={{ border: 'none', outline: 'none' }}>
          {!value ? (
            <option value={0} style={{ color: '#767676' }}>
              {defaultValue}
            </option>
          ) : null}
          {Array.isArray(data) && data.length
            ? data.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))
            : null}
        </select>
      </Stack>
      {error ? (
        <Box fontSize={14} color="error.main">
          {helperText}
        </Box>
      ) : null}
    </Stack>
  );
}

Dropdown.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string
};

export default Dropdown;
