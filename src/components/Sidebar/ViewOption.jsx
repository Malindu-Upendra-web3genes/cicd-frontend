import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

function ViewOption({ display, view, currView, setView, children }) {
  return (
    <Box
      display={display}
      lineHeight={0}
      color={view === currView ? 'secondary.main' : 'white'}
      onClick={() => setView(currView)}
      sx={{ '&:hover': { color: 'secondary.main' }, cursor: 'pointer' }}>
      {children}
    </Box>
  );
}

ViewOption.propTypes = {
  display: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  currView: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default ViewOption;
