import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Stack, Box, IconButton, Avatar } from '@mui/material';
import Logo from '../Logo';
import { isEmpty, upperCase } from 'lodash';
import RightMenu from './RightMenu';

function Header({ user, logOut }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const displayRightMenu = (e) => {
    if (!anchorEl) {
      setAnchorEl(e.currentTarget);
    }
  };

  return (
    <Box position="absolute" top={0} left={0} zIndex={3} height={80} bgcolor="white" width="100%">
      <Stack
        position="relative"
        direction="row"
        alignItems="center"
        justifyContent="center"
        height="100%"
        px={40}>
        <Box lineHeight={0} position="absolute" left={{ sm: 40, xs: 5 }} top={8}>
          <Logo width="52px" />
        </Box>
        {!isEmpty(user) ? (
          <Fragment>
            <Box lineHeight={0} position="absolute" right={{ sm: 40, xs: 5 }} top={15}>
              <IconButton size="small" onClick={displayRightMenu}>
                <Avatar>{upperCase(user.email[0])}</Avatar>
              </IconButton>
            </Box>
            <RightMenu anchorEl={anchorEl} setAnchorEL={setAnchorEl} user={user} logOut={logOut} />
          </Fragment>
        ) : null}
      </Stack>
    </Box>
  );
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired
};

export default Header;
