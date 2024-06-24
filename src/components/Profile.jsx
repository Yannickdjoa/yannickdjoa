import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { currentUser } = useSelector(loginUser);
  const dispatch = useDispatch();
  const handleSignout = async (e) => {
    e.preventDefault();
    dispatch(signOutStart());
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.status === false) {
        dispatch(signOutFailure(data.message));
      }
      navigate('/adminLogin');
      navigate(0); //refresh the targetted page
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };
  return (
    <div className="hidden md:flex opacity-90 font-bold rounded-2xl p-2 mr-4 md:mr-8 bg-yellow-600 hover:bg-yellow-600/80 text-neutral-700  border-2 cursor-pointer">
      {currentUser && (
        <div className="hidden md:flex md:flex-col gap-2">
          <div className="flex flex-row gap-2">
            <h1>{currentUser.name}</h1>
            <img
              src={currentUser.avatar}
              alt="profile image"
              className="h-6 w-6 rounded-full border-2 border-neutral-400"
            />
          </div>
          <button
            onClick={handleSignout}
            className=" text-red-800/80 hover:text-red-800 hover:text-xl"
          >
            LogOut
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
