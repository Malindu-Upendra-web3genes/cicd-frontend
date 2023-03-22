import React from 'react';
import { Outlet } from 'react-router-dom';
import { clearSession } from '../functions/session';

const ForceSessCloseRoutes = () => {
  clearSession();
  return <Outlet />;
};
export default ForceSessCloseRoutes;
