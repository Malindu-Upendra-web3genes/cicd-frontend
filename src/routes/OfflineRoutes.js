import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const OfflineRoutes = () => {
  return localStorage.getItem('x-authToken') && localStorage.getItem('user') ? (
    <Navigate to="/" replace={true} />
  ) : (
    <Outlet />
  );
};
export default OfflineRoutes;
