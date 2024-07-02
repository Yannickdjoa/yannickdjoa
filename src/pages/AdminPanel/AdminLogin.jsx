import { useState } from 'react';
import { selectAlltextsList } from '../../redux/slices/textsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';
import {
  userLogInStart,
  userLoginfailed,
  userLoginSuccess,
} from '../../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',

  marginBottom: 5,
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: '#404040',
  border: '2px solid #a3a3a3',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxShadow: 4,
  p: 4,
  display: 'grid',
  gap: 1,
  gridTemplateColumns: 'repeat(2)',
};

function AdminLogin() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { textsList } = useSelector(selectAlltextsList);
  const [showAddModal, setAddModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { loading, currentUser, error } = useSelector(loginUser);
  console.log(currentUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLogInStart());
    try {
      const response = await fetch(`${baseUrl}/api/auth/signin`, {
        method: 'POST',
        credentials: 'include',
        mode: 'same-origin',
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      const data = await response.json();
      if (data.status === 'failed') {
        dispatch(userLoginfailed(true));
        return;
      }
      console.log(data);
      dispatch(userLoginSuccess(data.data));
      navigate('/admindashboard');
      console.log(currentUser);
    } catch (error) {
      dispatch(userLoginfailed(true));
      dispatch(userLogInStart(false));
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mb-52">
      <div className="flex flex-col justify-center items-center gap-16 mt-32">
        <h1 className="flex text-2xl text-emerald-700 font-bold">
          {textsList.dashboardTitle}
        </h1>
        <p className="text-center text-lg">
          <span>{textsList.dashboardText1}</span> <br />{' '}
          <span>{textsList.dashboardText2}</span>
        </p>
        <button
          type="button"
          className="hidden md:flex opacity-90  font-bold rounded-2xl p-2 mr-4 md:mr-8 bg-yellow-600 hover:bg-yellow-600/80 text-neutral-700  border-2 cursor-pointer"
          onClick={() => {
            setAddModal(true);
          }}
        >
          Login
        </button>
      </div>
      <Modal
        open={showAddModal}
        onClose={() => setAddModal(false)}
        aria-labelledby="add-service"
      >
        <Box sx={style}>
          <div className="absolute right-0 top-0">
            <button
              disabled={loading}
              onClick={() => setAddModal(false)}
              className=" text-white text-2xl font-semibold text-center mr-2"
              type="button"
            >
              X
            </button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl text-white text-center font-semibold my-7">
              Insert Your Credentials
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="email"
                onChange={handleChange}
                className="border  p-2 rounded-lg "
                id="email"
                value={formData.email}
              />
              <input
                type="password"
                placeholder="password"
                onChange={handleChange}
                className="border p-2 rounded-lg "
                id="password"
                value={formData.password}
              />

              <div className="flex flex-row items-center justify-center gap-4 mt-8 ">
                <button disabled={loading} type="submit" className="btn px-4 ">
                  {loading ? 'is loading...' : 'Log In'}
                </button>
              </div>
            </form>
            <div className="flex gap-3 mt-5 ">
              <p>You do not have an account ? </p>
              <Link to={'/contact'}>
                <span className="text-red-500 hover:opacity-75">
                  Contact Admin
                </span>
              </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminLogin;
