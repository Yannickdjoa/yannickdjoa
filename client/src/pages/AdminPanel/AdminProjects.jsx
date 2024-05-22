import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {
  setProjectsList,
  startSettingProjectsList,
  failedToSetProjectsList,
} from '../../redux/stacks/projectSlice.js';
import projectSlice from '../../redux/stacks/projectSlice.js';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link, useParams } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: '#404040',
  border: '2px solid #a3a3a3',
  boxShadow: 4,
  p: 4,
};
function AdminProjects() {
  const params = useParams();
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [showAddEditModal, setAddEditModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    period: '',
    description: '',
    projectImg: '',
    tags: [],
    category: '',
    github: '',
    appLink: '',
  });
  const dispatch = useDispatch();
  const { projectsList, loading, error } = useSelector(
    (state) => state.projects
  );
  const projectsData = async () => {
    try {
      const response = await fetch('/api/projects/getAll');
      const data = await response.json();

      if (data.status === 'success') {
        dispatch(setProjectsList(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    projectsData();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
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
          setFormData({ ...formData, projectImg: downloadURLL });
        });
        setUploading(false);
      }
    );
  };
  const handleSubmit = async () => {
    const response = await fetch('/api/projects/create', {
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
            setAddEditModal(true);
          }}
          className="flex justify-start btn mt-8"
        >
          Add New Project
        </button>
      </div>
      <div className="grid grid-cols-6 gap-5">
        {projectsList &&
          projectsList.map((project) => (
            <div
              key={project.projectId}
              className="flex flex-col justify-center items-center border-2 border-neutral-400 mt-8 p-8  "
            >
              <img
                src={project.projectImg}
                alt="project image"
                className="w-8 md:w-12 h-8 md:h-12 my-4"
              />
              <h1 className="text-white font-bold">{project.title}</h1>
              <p className="text-neutral-400 text-xl">{project.category}</p>
              <p className="text-neutral-400 text-xl">{project.period}</p>
              <p className="text-neutral-400 text-lg">{project.description}</p>
              <p className="text-neutral-400 text-sm">{project.tags}</p>
              <div className="flex flex-row gap-4 justify-end mt-8">
                <Link
                  to={`/admindashboard/adminProjects/confirmdelation/${project.projectId}`}
                  className="btn bg-red-700 text-white font-normal"
                >
                  Delete
                </Link>
                <Link
                  to={`/admindashboard/adminProjects/${project.projectId}`}
                  className="btn px-4 "
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
      <Modal
        open={showAddEditModal}
        onClose={() => setAddEditModal(false)}
        aria-labelledby="modal-title"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <h1 id="add-experience">Add New Project</h1>
            <div className="flex flex-col py-4">
              <label htmlFor="name" className="flex justify-start text-white">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.title}
              />
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="name" className="flex justify-start text-white">
                Category
              </label>
              <input
                id="category"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.category}
              />
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="name" className="flex justify-start text-white">
                Period
              </label>
              <input
                id="period"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.period}
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
                value={formData.description}
              />
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="name" className="flex justify-start text-white">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.tags}
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
                value={formData.github}
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
                value={formData.github}
              />
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="name" className="flex justify-start text-white">
                App Link
              </label>
              <input
                id="appLink"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.appLink}
              />
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="name" className="flex justify-start text-white">
                Project Image
              </label>
              <input
                id="projectImg"
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
                Add Projects
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminProjects;
