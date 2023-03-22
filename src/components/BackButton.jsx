import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { ArrowBackOutlined } from '@mui/icons-material';

function BackButton({ color, fontSize, action }) {
  return (
    <Box onClick={action} color={color ? color : 'black'} lineHeight={0} sx={{ cursor: 'pointer' }}>
      <ArrowBackOutlined fontSize={fontSize ? fontSize : 'small'} />
    </Box>
  );
}

BackButton.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.string,
  action: PropTypes.func.isRequired
};

export default BackButton;
