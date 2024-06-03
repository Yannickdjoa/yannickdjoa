import React, { useEffect, useState } from 'react';
import { app, storage } from '../../../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function AdminPersonalData() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    author: '',
    address: '',
    github: '',
    linkedin: '',
    twitter: '',
    telegram: '',
    tikTok: '',
    youtube: '',
    email: '',
    telephone: '',
    logo: '',
    resume: '',
  });
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    const currentData = async () => {
      const response = await fetch('/api/bio/get/1715803389046');
      const data = await response.json();

      if (data.status == 'success') {
        setFormData({ ...data.data });
      }
    };
    currentData();
  }, []);

  useEffect(() => {
    if (file) {
      handleUploadFile(file);
    }
  }, [file]);

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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            logo: downloadURL,
            resume: downloadURL,
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
    e.preventDefault;
    try {
      setLoading(true);
      const response = await fetch('/api/bio/update/1715803389046', {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (data.status === 'success') {
        navigate('/admin');
      } else {
        return setError(data.message);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-emerald-700 text-2xl font-bold">
          Update Personal Data Here
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            author
          </label>
          <input
            id="author"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.author}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Address
          </label>
          <input
            id="address"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.address}
          />
        </div>

        <div className="flex flex-col py-4">
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
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Linkedin
          </label>
          <input
            id="linkedin"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.linkedin}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Twitter
          </label>
          <input
            id="twitter"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.twitter}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Telegram
          </label>
          <input
            id="telegram"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.telegram}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            TikTok
          </label>
          <input
            id="tikTok"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.tikTok}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Youtube
          </label>
          <input
            id="youtube"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.youtube}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.email}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Telephone
          </label>
          <input
            id="telephone"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.telephone}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Logo
          </label>
          <input
            id="logo"
            type="file"
            className="p-3 border border-gray-300 rounded w-full"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Resume
          </label>
          <input
            id="resume"
            type="file"
            className="p-3 border border-gray-300 rounded w-full"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className="self-center">
            {fileUploadError ? (
              <span className="text-red-700 ">
                File not upload (File must be less than 2mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-yellow-500 ">{`Uploading ${filePerc}`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700 ">File successfuly uploaded</span>
            ) : (
              ''
            )}
          </p>
        </div>
        <button
          disabled={loading || uploading}
          type="submit"
          className="flex justify-end cursor-pointer active text-center bg-yellow-600 mt-1 p-3 rounded-xl text-xl font-semibold text-neutral-700 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
        >
          {loading ? 'updating Bio...' : 'Save'}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default AdminPersonalData;
