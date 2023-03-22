import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from '@mui/material';

function ChipDropdown({ id, label, data, values, onChange, error, helperText, disabled }) {
  const getLabel = (cv) => {
    return data.find((d) => d.id === cv).label;
  };

  const getStyles = (cv) => {
    const styles = {};

    const isExist = values.find((c) => c === cv);

    if (isExist) {
      styles.backgroundColor = 'action.selected';
      styles.fontWeight = 700;
    }

    return styles;
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="dropdown-label" shrink={false} size="small" style={{ fontSize: '14px' }}>
        {values.length ? '' : label}
      </InputLabel>
      <Select
        labelId="dropdown-label"
        id={id}
        multiple
        value={values}
        onChange={onChange}
        notched={false}
        size="small"
        error={error}
        disabled={disabled}
        renderValue={(selected) => (
          <Box display="flex" flexWrap="wrap" gap={5}>
            {Array.isArray(selected)
              ? selected.map((s) => (
                  <Chip key={s} label={getLabel(s)} size="small" /> //onDelete={() => removeItem(s.id)}
                ))
              : null}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250
            }
          }
        }}>
        {Array.isArray(data)
          ? data.map((d) => (
              <MenuItem key={d.id} value={d.id} sx={getStyles(d.id)}>
                {d.label}
              </MenuItem>
            ))
          : null}
      </Select>
      <FormHelperText style={{ fontSize: '12px', color: error ? 'error.main' : 'black' }}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}

ChipDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

ChipDropdown.defaultProps = {
  disabled: false
};

export default ChipDropdown;
