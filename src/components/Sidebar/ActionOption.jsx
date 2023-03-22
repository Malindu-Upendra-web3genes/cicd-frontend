import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

function ActionOption({ action, children }) {
  return (
    <Box
      lineHeight={0}
      color="white"
      onClick={action}
      sx={{ '&:hover': { color: 'secondary.main' }, cursor: 'pointer' }}>
      {children}
    </Box>
  );
}

ActionOption.propTypes = {
  action: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default ActionOption;
