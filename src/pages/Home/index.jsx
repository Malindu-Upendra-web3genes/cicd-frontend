import React, { useState } from 'react';
import { Box } from '@mui/material';
import Content from '../../components/Content';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { VIEW_SELLERS } from '../../constants/views';
import { clearSession } from '../../functions/session';

function Home() {
  const [view, setView] = useState(VIEW_SELLERS);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const logOut = () => {
    clearSession();
    window.location.reload();
  };

  return (
    <Box height="100vh" position="relative" overflow="hidden">
      <Header user={user} logOut={logOut} />
      <Sidebar view={view} setView={setView} user={user} />
      <Content view={view} setView={setView} setUser={setUser} />
    </Box>
  );
}

export default Home;
