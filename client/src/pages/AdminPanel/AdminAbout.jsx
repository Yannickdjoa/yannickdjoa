import React, { useEffect, useState } from 'react';
import { app, storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function AdminAboutMe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    aboutCaption: '',
    aboutsubtitle1: '',
    aboutsubtitle2: '',
    aboutsubtitle3: '',
    aboutsubtitle4: '',
    aboutText: '',
    profileImg: '',
  });
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    const currentData = async () => {
      const response = await fetch('/api/aboutMe/get/1715796950404');
      const data = await response.json();

      if (data.status == 'success') {
        setFormData({ ...data.data });
      }
    };
    currentData();
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
            profileImg: downloadURL,
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
      const response = await fetch('/api/aboutMe/update/1715796950404', {
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
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            About Caption
          </label>
          <input
            id="aboutCaption"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.aboutCaption}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            About Subtitle 1
          </label>
          <input
            id="aboutsubtitle1"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.aboutsubtitle1}
          />
        </div>

        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            About Subtitle 2
          </label>
          <input
            id="aboutsubtitle2"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.aboutsubtitle2}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            About Subtitle 3
          </label>
          <input
            id="aboutsubtitle3"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.aboutsubtitle3}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            About Subtitle 4
          </label>
          <input
            id="aboutsubtitle4"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.aboutsubtitle4}
          />
        </div>

        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            About Text
          </label>
          <textarea
            id="aboutText"
            type="text"
            className="textarea"
            onChange={handleChange}
            defaultValue={formData.aboutText}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Profile Image
          </label>
          <input
            id="profileImg"
            type="file"
            className="p-3 border border-gray-300 rounded w-full"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className="self-center">
            {fileUploadError ? (
              <span className="text-red-700 ">
                image not upload (image must be less than 2mb)
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
        <button
          disabled={loading || uploading}
          type="submit"
          className="flex justify-end cursor-pointer active text-center bg-yellow-600 mt-1 p-3 rounded-xl text-xl font-semibold text-neutral-700 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
        >
          {loading ? 'updating About Me...' : 'Save'}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default AdminAboutMe;
