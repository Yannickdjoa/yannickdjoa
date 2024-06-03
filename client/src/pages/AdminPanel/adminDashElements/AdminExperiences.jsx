import { useSelector, useDispatch } from 'react-redux';
import experiencesSlice from '../../../redux/slices/experienceSlice.js';
import React, { useEffect, useState } from 'react';
import { storage } from '../../../../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {
  setExperiencesList,
  startSettingExperiencesList,
  failedToSetExperiencesList,
} from '../../../redux/slices/experienceSlice.js';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link, useParams } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: '#404040',
  border: '2px solid #a3a3a3',
  boxShadow: 4,
  p: 4,
};
function AdminExperiences() {
  const params = useParams();
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [showAddModal, setAddModal] = useState(false);
  const [formData, setFormData] = useState({
    companyImage: '',
    role: '',
    company: '',
    date: '',
    description: '',
    skills: [],
  });
  const dispatch = useDispatch();
  const { experiencesList, loading, error } = useSelector(
    (state) => state.experiences
  );
  const experienceData = async () => {
    dispatch(startSettingExperiencesList(true));
    try {
      const response = await fetch('/api/experiences/get');
      const data = await response.json();

      if (data.status === 'success') {
        dispatch(setExperiencesList(data.data));
        dispatch(failedToSetExperiencesList(null));
        dispatch(startSettingExperiencesList(false));
      }
    } catch (error) {
      dispatch(failedToSetExperiencesList(null));
      dispatch(startSettingExperiencesList(true));
      console.log(error);
    }
  };
  useEffect(() => {
    experienceData();
  }, []);
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

  //function & useEffect to handle the file upload

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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURLL) => {
          setFormData({ ...formData, companyImage: downloadURLL });
        });
        setUploading(false);
      }
    );
  };
  const handleSubmit = async () => {
    const response = await fetch('/api/experiences/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
      }),
    });
  };

  return (
    <div>
      <div>
        <button
          type="buttton"
          onClick={() => {
            setAddModal(true);
          }}
          className="flex justify-start btn mt-8"
        >
          Add New Stack
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {experiencesList &&
          experiencesList.map((experience) => (
            <div
              key={experience.experienceId}
              className="flex flex-col justify-center items-center border-2 border-neutral-400 mt-8 p-8  "
            >
              <h1 className="text-white font-bold">{experience.role}</h1>
              <div className="flex flex-row">
                <p className="text-neutral-400 text-xl">{experience.company}</p>
                <img
                  src={experience.companyImage}
                  alt="experience image"
                  className="w-8 md:w-12 h-8 md:h-12 my-4"
                />
              </div>
              <p className="text-neutral-400 text-xl">{experience.date}</p>
              <p className="text-neutral-400 text-lg line-clamp-5 overflow-hidden text-justify">
                {experience.description}
              </p>
              <p className="text-neutral-400 text-sm">{experience.skills}</p>
              <div className="flex flex-row gap-8 justify-end mt-8">
                <Link
                  to={`/admindashboard/experiences/confirmdelation/${experience.experienceId}`}
                  className="btn bg-red-700 text-white font-normal"
                >
                  Delete
                </Link>
                <Link
                  to={`/admindashboard/experiences/${experience.experienceId}`}
                  className="btn px-4 "
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
      <Modal
        open={showAddModal}
        onClose={() => setAddModal(false)}
        aria-labelledby="add-experience"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <h1
              id="add-experience"
              className="text-white text-xl font-bold text-center mb-4"
            >
              Add New Experience
            </h1>
            <div className="flex flex-col py-1">
              <label htmlFor="name" className="flex justify-start text-white">
                Role
              </label>
              <input
                id="role"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.role}
              />
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="name" className="flex justify-start text-white">
                Company
              </label>
              <input
                id="company"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.company}
              />
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="name" className="flex justify-start text-white">
                Date
              </label>
              <input
                id="date"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.date}
              />
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="name" className="flex justify-start text-white">
                Description
              </label>
              <input
                id="description"
                type="text"
                className="textarea h-24"
                onChange={handleChange}
                value={formData.description}
              />
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="name" className="flex justify-start text-white">
                Skills
              </label>
              <input
                id="skills"
                type="text"
                className="input"
                onChange={handleArrayChange}
                value={formData.skills}
              />
            </div>
            <div className="flex flex-col py-1">
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
                onClick={(e) => setAddModal(false)}
                className="btn bg-red-700 text-white font-normal"
                type="button"
              >
                Cancel
              </button>
              <button type="submit" className="btn px-4 ">
                Add Experience
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminExperiences;
