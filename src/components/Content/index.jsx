import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import {
  VIEW_ADD_USER,
  VIEW_BRANDS,
  VIEW_CATEGORIES,
  VIEW_SELLERS,
  VIEW_USERS
} from '../../constants/views';
import Sellers from '../Sellers';
import Users from '../Users';
import AddUser from '../AddUser';
import Categories from '../Categories';
import AlertToast from '../AlertToast';
import { PROP_MESSAGE } from '../../constants/properties';
import { SEV_SUCCESS } from '../../constants/severities';
import Brands from '../Brands';

function Content({ view, setView, setUser }) {
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState('');

  const location = useLocation();

  function initToast() {
    if (location.state && PROP_MESSAGE in location.state) {
      setToast(true);
      setMessage(location.state.message);
      setTimeout(() => window.history.replaceState({}, document.title), 5000);
    }
  }

  useEffect(() => {
    initToast();
  }, []);

  return (
    <Stack
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={1}
      pt={80}
      pl={70}>
      <Stack height="100%" overflow="auto">
        {(() => {
          switch (view) {
            case VIEW_SELLERS:
              return <Sellers rowsPerPage={10} />;
            case VIEW_USERS:
              return <Users rowsPerPage={10} />;
            case VIEW_ADD_USER:
              return <AddUser />;
            case VIEW_CATEGORIES:
              return <Categories />;
            case VIEW_BRANDS:
              return <Brands />;
          }
        })()}
      </Stack>
      <AlertToast
        open={toast}
        type={SEV_SUCCESS}
        message={message}
        setOpen={setToast}
        hideAfter={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Stack>
  );
}

Content.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};
export default Content;
