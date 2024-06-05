import React, { useEffect, useState } from 'react';
import { app, storage } from '../../../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function AdminIntro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mainCaption: '',
    secondaryCaption: '',
    coloredCaption: '',
    introText: '',
    captionImg: '',
    buttonImg: '',
    buttonText: '',
    buttonLink: '',
  });
  const [file, setFile] = useState(undefined);
  const [fileCap, setFileCap] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    const currentData = async () => {
      const response = await fetch('/api/webIntro/get/1716567889750');
      const data = await response.json();
      if (data.status == 'success') {
        setFormData({ ...data.data });
      }
    };
    currentData();
  }, []);

  // useEffect(() => {
  //   if (file) {
  //     handleUploadButtonImage(file);
  //   }
  // }, [file]);
  useEffect(() => {
    if (fileCap) {
      handleUploadCaptionImage(fileCap);
    } else if (file) {
      handleUploadButtonImage(file);
    }
  }, [fileCap, file]);

  const handleUploadButtonImage = async (file) => {
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
            buttonImg: downloadURL,
          });
        });
        setUploading(false);
      }
    );
  };
  const handleUploadCaptionImage = async (fileCap) => {
    setUploading(true);
    const fileName = new Date().getTime() + fileCap.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, fileCap);
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
            captionImg: downloadURL,
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
      const response = await fetch('/api/webIntro/update/1716567889750', {
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
      <div>
        <h1 className="text-center text-emerald-700 text-2xl font-bold">
          Update Any Web Intro's Element here
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Main caption
          </label>
          <input
            id="mainCaption"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.mainCaption}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Secondary caption
          </label>
          <input
            id="secondaryCaption"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.secondaryCaption}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Colored caption
          </label>
          <input
            id="coloredCaption"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.coloredCaption}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Intro Text
          </label>
          <textarea
            id="introText"
            type="text"
            className="textarea"
            onChange={handleChange}
            defaultValue={formData.introText}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            caption Image
          </label>
          <input
            id="captionImg"
            type="file"
            className="p-3 border border-gray-300 rounded w-full"
            accept="image/*"
            onChange={(e) => setFileCap(e.target.files[0])}
            defaultValue={formData.captionImg}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            button Image
          </label>
          <input
            id="buttonImg"
            type="file"
            className="p-3 border border-gray-300 rounded w-full"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            defaultValue={formData.buttonImg}
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
          {loading ? 'updating webintro...' : 'Save'}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default AdminIntro;
