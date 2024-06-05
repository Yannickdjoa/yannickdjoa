import React from 'react';
import { dashboardNavigation } from '../../../data/Database';
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
  return (
    <div className="flex bg-zinc-800 h-[100vh] w-52 text-white  mr-12  z-10 ">
      <ul className="flex flex-col mt-20 first-letter: ml-4 gap-8">
        {dashboardNavigation.map((adminNav, index) => {
          return (
            <NavLink
              key={index}
              to={adminNav.link}
              className={({ isActive }) => {
                return (
                  'p-2  cursor-pointer hover:underline hover:underline-offset-4' +
                  (isActive
                    ? ' text-emerald-700 text-xl font-semi-bold '
                    : 'text-white text-lg font-semibold')
                );
              }}
            >
              <li>{adminNav.name}</li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}

export default AdminSidebar;
