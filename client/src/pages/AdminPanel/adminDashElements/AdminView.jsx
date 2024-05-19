import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminView() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AdminView;
