import React from 'react';
import { Outlet } from 'react-router-dom';
import Welcome from '../pages/Welcome';

const ProtectedRoutes = () => {
  return localStorage.getItem('x-authToken') && localStorage.getItem('user') ? (
    <Outlet />
  ) : (
    <Welcome />
  );
};
export default ProtectedRoutes;
