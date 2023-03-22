import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Box } from '@mui/material';
import BackButton from '../BackButton';

function User({ user, setProgress, setMessage, setSeverity, setAlert, setView, setResponse }) {
  const navigateToPrevious = () => {
    setView(0);
  };

  return (
    <Stack gap={40} borderRadius={{ sm: 5, xs: 0 }} p={{ sm: 30, xs: 5 }} bgcolor="white">
      <Stack direction="row" gap={15} alignItems="center">
        <BackButton action={navigateToPrevious} />
        <Box display="inline-block" fontWeight={700} fontStyle="normal" color="black">
          {user.firstName}
        </Box>
      </Stack>
    </Stack>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  setProgress: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setSeverity: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setResponse: PropTypes.func.isRequired
};

export default User;
