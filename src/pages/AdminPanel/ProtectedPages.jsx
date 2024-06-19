import React from 'react';
import { Outlet } from 'react-router-dom';

function ProtectedPages() {
    // const { user } = useSelector(selectUser);
    // if (!user) {
    //   return <Redirect to="/login" />;
    // }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProtectedPages;
