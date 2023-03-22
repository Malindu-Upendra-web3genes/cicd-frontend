import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Stack, Box, Button, Divider } from '@mui/material';
import { LogoutOutlined, PersonOutlined, SettingsOutlined } from '@mui/icons-material';
import { toLower } from 'lodash';

function RightMenu({ anchorEl, setAnchorEL, user, logOut }) {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const _handleClose = () => {
    setAnchorEL(null);
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      onClose={_handleClose}>
      <Box borderRadius={1} py={15} px={10} bgcolor="white" overflow="hidden">
        <Stack gap={5}>
          <Button size="small" variant="text" startIcon={<PersonOutlined />}>
            {toLower(user.email)}
          </Button>
          <Divider />
          <Box>
            <Button size="small" variant="text" startIcon={<SettingsOutlined />}>
              Settings
            </Button>
          </Box>
          <Box>
            <Button size="small" variant="text" startIcon={<LogoutOutlined />} onClick={logOut}>
              Log out
            </Button>
          </Box>
        </Stack>
      </Box>
    </Popover>
  );
}

RightMenu.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEL: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired
};

export default RightMenu;
