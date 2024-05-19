import React from 'react';

function DashboardText() {
  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <h1 className="flex text-2xl text-emerald-700 font-bold">
        Welcome to Admin Dashboard
      </h1>
      <p className="text-center text-lg">
        <span>
          This space is exclusively for employees. Please login to be able to
          make changes
        </span>{' '}
        <br />{' '}
        <span>
          In case you forgot your logins, please contact your administrator
        </span>
      </p>
      <button className="btn px-4">Login</button>
    </div>
  );
}

export default DashboardText;
