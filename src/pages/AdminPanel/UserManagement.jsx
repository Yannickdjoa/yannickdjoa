import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import { loginUser } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../../firebase.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  setUserList,
  failedToUploadUserList,
  uploadingUserList,
} from '../../redux/slices/userSlice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',

  marginBottom: 5,
  transform: 'translate(-50%, -50%)',
  width: 1000,
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

function UserManagement() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userList } = useSelector(loginUser);
  const [showAddModal, setAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: '',
    location: '',
    github: '',
    contractType: '',
    category: '',
    avatar: '',
    position: '',
  });
  // `${baseUrl}
  const fetchUsersList = async () => {
    dispatch(uploadingUserList(true));
    try {
      const response = await fetch('/api/users/getAll');
      const data = await response.json();
      dispatch(setUserList(data.data));
      dispatch(uploadingUserList(false));
      dispatch(failedToUploadUserList(false));
    } catch (error) {
      dispatch(uploadingUserList(false));
      dispatch(failedToUploadUserList(error.message));
    }
  };
  useEffect(() => {
    fetchUsersList();
  }, [dispatch]);

  const handleUploadFile = async (file) => {
    setUploading(true);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURLL) => {
          setFormData({ ...formData, avatar: downloadURLL });
        });
        setUploading(false);
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleUploadFile(file);
    }
  }, [file]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const resetFormFields = () => {
    setFormData({
      name: '',
      displayName: '',
      phoneNumber: '',
      email: '',
      password: '',
      role: '',
      location: '',
      github: '',
      contractType: '',
      category: '',
      avatar: '',
      position: '',
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const auth = getAuth(app);
    // const { email, password } = formData;

    try {
      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // const { user } = userCredential;
      // ${baseUrl}
      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // uid: user.uid,
        }),
      });
      console.log(formData);
      const data = await res.json();
      console.log(data);
      if (data.status === 'success') {
        setAddModal(false);
        resetFormFields();
      }
      return;
    } catch (error) {
      console.log('error detected', error);
    }
  };
  console.log(userList);
  return (
    <div>
      <div className="flex flex-col justify-between gap-10">
        <div className="flex flex-col justify-between items-center gap-4">
          <div className="mt-10">
            <h1 className="text-center text-emerald-700 text-3xl font-bold">
              User management for Admin
            </h1>
          </div>
          <div className="flex flex-col items-center text-xl text-white">
            <p>Welcome to Admin panel for Users management</p>
          </div>
        </div>
        <div className="ml-20">
          <button
            type="button"
            className="hidden md:flex opacity-90  font-bold rounded-2xl p-2 mr-4 md:mr-8 bg-yellow-600 hover:bg-yellow-600/80 text-neutral-700  border-2 cursor-pointer"
            onClick={() => {
              setAddModal(true);
            }}
          >
            Create New User
          </button>
        </div>
        <div className="grid grid-cols-5 gap-5 mx-10">
          {userList &&
            userList.map((user) => (
              <div
                key={user.uid}
                className="flex flex-col justify-between items-start border-2 border-neutral-400 mt-8 p-4  "
              >
                <div className="mb-4">
                  <h1 className="text-white text-2xl font-semibold">
                    {user.name}
                  </h1>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-neutral-400 text-xl">
                    <span className="text-white">userName: </span>
                    {user.displayName}
                  </p>
                  <p className="text-neutral-400 text-xl">
                    <span className="text-white">Email: </span>
                    {user.email}
                  </p>
                  <p className="text-neutral-400 text-xl">
                    <span className="text-white">Role: </span>
                    {user.role}
                  </p>
                  <p className="text-neutral-400 text-lg line-clamp-5 overflow-hidden text-justify">
                    <span className="text-white">Employment type: </span>
                    {user.category}
                  </p>
                </div>

                <div className="flex flex-row gap-8 justify-end mt-8">
                  <Link
                    to={`/admindashboard/usermanagement/deleteteuser/${user.uid}`}
                    className="btn bg-red-700 text-white font-normal"
                  >
                    Delete
                  </Link>
                  <Link
                    to={`/admindashboard/usermanagement/updateuser/${user.uid}`}
                    className="btn px-4 "
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="absolute right-10 top-60">
          <button
            type="button"
            className="flex  cursor-pointer active items-center gap-2 text-center bg-neutral-600 p-2 rounded-xl text-xl font-semibold text-yellow-600 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
            onClick={() => navigate('/admindashboard')}
          >
            <TiArrowBackOutline className=" md:h-6 md:w-6" />
            Back
          </button>
        </div>
      </div>

      <Modal
        open={showAddModal}
        onClose={() => setAddModal(false)}
        aria-labelledby="add-service"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit} className="text-white">
            <h1
              id="add-service"
              className="text-white text-xl font-bold text-center mb-4"
            >
              Create New User
            </h1>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                User Full Name
              </label>
              <input
                id="name"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                userName
              </label>
              <input
                id="displayName"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.displayName}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.phoneNumber}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                password
              </label>
              <input
                id="password"
                type="password"
                className="input"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                role
              </label>
              <input
                id="role"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.role}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.location}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Contract Type
              </label>
              <input
                id="contractType"
                type="text"
                className="input"
                onChange={handleChange}
                defaultValue={formData.contractType}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Github
              </label>
              <input
                id="github"
                type="text"
                className="input"
                onChange={handleChange}
                defaultValue={formData.github}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Category
              </label>
              <input
                id="category"
                type="text"
                className="input"
                onChange={handleChange}
                defaultValue={formData.category}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Position
              </label>
              <input
                id="position"
                type="text"
                className="input"
                onChange={handleChange}
                defaultValue={formData.position}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Avatar
              </label>
              <input
                id="avatar"
                type="file"
                className="p-3 border border-gray-300 rounded w-full"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <p className="self-center">
                {fileUploadError ? (
                  <span className="text-red-700 ">
                    Image not upload (File must be less than 2mb)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-yellow-500 ">{`Uploading ${filePerc}`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-700 ">
                    Image successfuly uploaded
                  </span>
                ) : (
                  ''
                )}
              </p>
            </div>
            <div className="flex flex-row gap-4 justify-end mt-8">
              <button
                disabled={uploading}
                onClick={() => setAddModal(false)}
                className="btn bg-red-700 text-white font-normal"
                type="button"
              >
                Cancel
              </button>
              <button disabled={uploading} type="submit" className="btn px-4 ">
                Add User
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default UserManagement;
