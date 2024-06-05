import { useSelector, useDispatch } from 'react-redux';
import serviceSlice from '../../../redux/slices/serviceSlice.js';
import React, { useEffect, useState } from 'react';
import { storage } from '../../../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {
  setServicesList,
  startSettingServicesList,
  failedToSetServicesList,
} from '../../../redux/slices/serviceSlice.js';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link, useParams } from 'react-router-dom';

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
function AdminServices() {
  const params = useParams();
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [showAddModal, setAddModal] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    serviceName: '',
    description: '',
    price: '',
    timeFrame: '',
    serviceImage: '',
    language: [],
    stacksUsed: [],
    keyFeatures: [],
    howItWorks: [],
  });
  const dispatch = useDispatch();
  const { servicesList } = useSelector((state) => state.services);
  const serviceData = async () => {
    dispatch(startSettingServicesList(true));
    try {
      const response = await fetch('/api/services/getAll');
      const data = await response.json();

      if (data.status === 'success') {
        dispatch(setServicesList(data.data));
        dispatch(failedToSetServicesList(null));
        dispatch(startSettingServicesList(false));
      }
    } catch (error) {
      dispatch(failedToSetServicesList(null));
      dispatch(startSettingServicesList(true));
      console.log(error);
    }
  };
  useEffect(() => {
    serviceData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  //below func. get multiple elements from input and make an array of them split by coma
  const handleArrayChange = async (id) => {
    const inputArray = await document.getElementById(id).value.split(',');
    setFormData({
      ...formData,
      [id]: inputArray,
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
          setFormData({ ...formData, serviceImage: downloadURLL });
        });
        setUploading(false);
      }
    );
  };
  const handleSubmit = async () => {
    const response = await fetch('/api/services/create', {
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
          Add New Service
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {servicesList &&
          servicesList.map((service) => (
            <div
              key={service.serviceId}
              className="flex flex-col justify-center items-center border-2 border-neutral-400 mt-8 p-8  "
            >
              <div className="flex flex-row justify-end items-center gap-4">
                <h1 className="text-white font-bold">{service.serviceName}</h1>
                <img
                  src={service.serviceImage}
                  alt="service image"
                  className="w-6  h-6 my-4"
                />
              </div>
              <p className="text-neutral-400 text-xl">{service.category}</p>
              <p className="text-neutral-400 text-xl">{service.timeFrame}</p>
              <p className="text-neutral-400 text-xl">{service.price}</p>
              <p className="text-neutral-400 text-lg">{service.description}</p>
              <p className="text-neutral-400 text-sm">{service.stacksUsed}</p>
              <div className="flex flex-row gap-8 justify-end mt-8">
                <Link
                  to={`/admindashboard/services/confirmdelation/${service.serviceId}`}
                  className="btn bg-red-700 text-white font-normal"
                >
                  Delete
                </Link>
                <Link
                  to={`/admindashboard/services/${service.serviceId}`}
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
        aria-labelledby="add-service"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit} className="text-white">
            <h1
              id="add-service"
              className="text-white text-xl font-bold text-center mb-4"
            >
              Add New service
            </h1>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Service Name
              </label>
              <input
                id="serviceName"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.serviceName}
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
                value={formData.category}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Time Frame
              </label>
              <input
                id="timeFrame"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.timeFrame}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Price
              </label>
              <input
                id="price"
                type="text"
                className="input"
                onChange={handleChange}
                value={formData.price}
              />
            </div>
            <div className="flex flex-col">
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
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                stacksUsed
              </label>
              <input
                id="stacksUsed"
                type="text"
                className="input"
                onChange={() => handleArrayChange('stacksUsed')}
                value={formData.stacksUsed}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Programming Language
              </label>
              <input
                id="language"
                type="text"
                className="input"
                onChange={() => handleArrayChange('language')}
                value={formData.language}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Key Features
              </label>
              <input
                id="keyFeatures"
                type="text"
                className="input"
                onChange={() => handleArrayChange('keyFeatures')}
                defaultValue={formData.keyFeatures}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                How It Works
              </label>
              <input
                id="howItWorks"
                type="text"
                className="input"
                onChange={() => handleArrayChange('howItWorks')}
                defaultValue={formData.howItWorks}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="flex justify-start text-white">
                Service Image
              </label>
              <input
                id="serviceImage"
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
                Add service
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminServices;
