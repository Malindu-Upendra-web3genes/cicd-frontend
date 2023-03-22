import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
import {
  MenuOutlined,
  VillaOutlined,
  CollectionsBookmarkOutlined,
  SupervisorAccountOutlined,
  SettingsOutlined,
  LoginOutlined,
  WidgetsOutlined,
  WorkspacePremiumOutlined
} from '@mui/icons-material';
import {
  VIEW_ADD_USER,
  VIEW_BRANDS,
  VIEW_CATEGORIES,
  VIEW_SELLERS,
  VIEW_SETTINGS,
  VIEW_USERS
} from '../../constants/views';
import { TYPE_SP_ADMIN } from '../../constants/user_types';
import ViewOption from './ViewOption';
import ActionOption from './ActionOption';

function Sidebar({ view, setView, user }) {
  const _menu = () => {
    console.log('menu');
  };

  const signOut = () => {
    localStorage.removeItem('x-authToken');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      height="100%"
      width={70}
      bgcolor="primary.main"
      zIndex={2}>
      <Stack position="relative" height="100%" pt={80} alignItems="center">
        <Stack alignItems="center" gap={80} py={30}>
          <ActionOption action={_menu}>
            <MenuOutlined />
          </ActionOption>
          <Stack alignItems="center" gap={30}>
            <ViewOption display="block" view={view} currView={VIEW_SELLERS} setView={setView}>
              <VillaOutlined />
            </ViewOption>
            <ViewOption
              display={user.type === TYPE_SP_ADMIN ? 'block' : 'none'}
              view={view}
              currView={VIEW_USERS}
              setView={setView}>
              <CollectionsBookmarkOutlined />
            </ViewOption>
            <ViewOption
              display={user.type === TYPE_SP_ADMIN ? 'block' : 'none'}
              view={view}
              currView={VIEW_ADD_USER}
              setView={setView}>
              <SupervisorAccountOutlined />
            </ViewOption>
            <ViewOption display="block" view={view} currView={VIEW_CATEGORIES} setView={setView}>
              <WidgetsOutlined />
            </ViewOption>
            <ViewOption display="block" view={view} currView={VIEW_BRANDS} setView={setView}>
              <WorkspacePremiumOutlined />
            </ViewOption>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

Sidebar.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Sidebar;
