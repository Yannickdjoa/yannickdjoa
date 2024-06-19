import React, { useState } from 'react';
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

function CreateUser() {
//   const [formData, setFormData] = useState({
//     name: '',
//     userName: '',
//     phone: '',
//     email: '',
//     password: '',
//     role: '',
//     location: '',
//     github: '',
//     contractType: '',
//     category: '',
//     avatar: '',
//   });
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };
  return (
    <div>
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

export default CreateUser;
