import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControlLabel } from '@mui/material';

function CheckBox({ label, value, onChange, size, marginTop, disabled }) {
  return (
    <Box mt={marginTop}>
      <FormControlLabel
        label={label ? label : ''}
        control={<Checkbox size={size} onChange={onChange} checked={value} disabled={disabled} />}
      />
    </Box>
  );
}

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  marginTop: PropTypes.number,
  disabled: PropTypes.bool
};

CheckBox.defaultProps = {
  onChange: undefined,
  size: 'small',
  marginTop: -7,
  disabled: false
};

export default CheckBox;
