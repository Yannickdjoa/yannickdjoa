import React, { useState } from 'react';
import { OAuth } from '../../components/OAuth';
import { useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';
import {
  userLogInStart,
  userLoginfailed,
  userLoginsuccess,
} from '../../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { loading, currentUser, error } = useSelector(loginUser);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLogInStart());
    try {
      const response = await fetch(`${baseUrl}/api/user/`);
      const data = response.json();
      if (data.status === 'success') {
        dispatch(userLoginsuccess(data.data));
        dispatch(userLoginfailed(null));
        dispatch(userLogInStart(false));
      }
      navigate('/');
    } catch (error) {
      dispatch(userLoginfailed(true));
      dispatch(userLogInStart(false));
      console.log(error);
      navigate('/login');
    }
  };
  return (
    <div className="p-3 max-w-lg  mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-green-400 disabled: opacity-80"
        >
          {loading ? 'is loading...' : 'Log In'}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-3 mt-5 ">
        <p>You do not have an account ? </p>
        <Link to={'/sign-up'}>
          <span className="text-red-500 hover:opacity-75">Contact Admin</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default AdminLogin;
