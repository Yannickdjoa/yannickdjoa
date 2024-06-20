import { useEffect, useState } from 'react';
import { storage } from '../../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import { getAuth, updateEmail } from 'firebase/auth';
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  loginUser,
} from '../../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function UpdateUser() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector(loginUser);
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    phoneNumber: '',
    email: '',
    // password: '',
    role: '',
    location: '',
    github: '',
    contractType: '',
    category: '',
    avatar: '',
    position: '',
  });
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const UpdatedUserData = async () => {
    const response = await fetch(`${baseUrl}/api/users/get/${params.userId}`);
    const data = await response.json();
    if (data.status == 'success') {
      setFormData({ ...data.data });
    }
  };
  useEffect(() => {
    UpdatedUserData(params);
  }, []);

  useEffect(() => {
    if (file) {
      handleUploadImage(file);
    }
  }, [file]);

  const handleUploadImage = async (file) => {
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            avatar: downloadURL,
          });
        });
        setUploading(false);
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart(true));

      const response = await fetch(
        `${baseUrl}/api/users/update/${params.userId}`,
        {
          method: 'PUT',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      dispatch(updateUserStart(false));

      if (data.status === 'success') {
        dispatch(updateUserFailure(null));
        dispatch(updateUserSuccess(data.data));
        dispatch(updateUserStart(false));
        navigate('/admindashboard/usermanagement');
      } else {
        dispatch(updateUserFailure(data.message));
      }
    } catch (error) {
      console.log(error);
      updateUserFailure(error.message);
      dispatch(updateUserStart(false));
    }
  };

  return (
    <div>
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
            value={formData.name || ''}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="flex justify-start text-white">
            userName
          </label>
          <input
            id="userName"
            type="text"
            className="input"
            onChange={handleChange}
            value={formData.userName || ''}
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
            value={formData.phoneNumber || ''}
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
            value={formData.email || ''}
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
            value={formData.password || ''}
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
            value={formData.role || ''}
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
            value={formData.location || ''}
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
            value={formData.contractType || ''}
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
            value={formData.github || ''}
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
            value={formData.category || ''}
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
            value={formData.position || ''}
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
        <div className="flex flex-row justify-start gap-16 ml-8">
          <button
            disabled={loading || uploading}
            type="button"
            className="flex  cursor-pointer active items-center gap-2 text-center bg-neutral-600 mt-1 p-3 rounded-xl text-xl font-semibold text-yellow-600 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
            onClick={() => navigate('/admindashboard/usermanagement')}
          >
            <TiArrowBackOutline className=" md:h-8 md:w-8" />
            Back
          </button>
          <button
            disabled={loading || uploading}
            type="submit"
            className="flex  cursor-pointer active text-center bg-yellow-600 mt-1 p-3 rounded-xl text-xl font-semibold text-neutral-700 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
          >
            {loading ? 'updating webintro...' : 'Save'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-700 text-sm">{error}</p>}
    </div>
  );
}

export default UpdateUser;
