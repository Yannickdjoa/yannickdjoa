import React, { useEffect, useState } from 'react';
import { app, storage } from '../../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
function ExperienceBox() {
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyImage: '',
    role: '',
    company: '',
    date: '',
    description: '',
    skills: [],
  });
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const currentData = async () => {
    const response = await fetch(`/api/experiences/get/${params.experId}`);
    const data = await response.json();
    if (data.status == 'success') {
      setFormData({ ...data.data });
    }
  };
  useEffect(() => {
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
            stackImage: downloadURL,
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
  //below func. get multiple elements from input and make an array of them split by coma
  const handleArrayChange = async () => {
    const inputArray = await document.getElementById('skills').value.split(',');
    setFormData({
      ...formData,
      skills: inputArray,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault;
    try {
      setLoading(true);
      const response = await fetch(
        `/api/experiences/update/${params.experId}`,
        {
          method: 'PUT',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data.status === 'success') {
        navigate('/admindashboard');
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
      <form onSubmit={handleUpdate}>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Role
          </label>
          <input
            id="role"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.role}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Company
          </label>
          <input
            id="company"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.company}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Date
          </label>
          <input
            id="date"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.date}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.description}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Skills
          </label>
          <input
            id="skills"
            type="text"
            className="input"
            onChange={handleArrayChange}
            defaultValue={formData.skills}
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="name" className="flex justify-start text-white">
            Company Image
          </label>
          <input
            id="companyImage"
            type="file"
            className="p-3 border border-gray-300 rounded w-full"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className="self-center">
            {fileUploadError ? (
              <span className="text-red-700 ">
                image not uploaded (image must be less than 2mb)
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
            type="submit"
            className="flex  cursor-pointer active text-center bg-yellow-600 mt-1 p-3 rounded-xl text-xl font-semibold text-neutral-700 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
          >
            {loading ? 'Updating Experience...' : 'Save'}
          </button>
          <button
            disabled={loading || uploading}
            type="button"
            className="flex  cursor-pointer active items-center gap-2 text-center bg-neutral-600 mt-1 p-3 rounded-xl text-xl font-semibold text-yellow-600 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
            onClick={() => navigate('/admindashboard')}
          >
            <TiArrowBackOutline className=" md:h-8 md:w-8" />
            Back
          </button>
        </div>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default ExperienceBox;
