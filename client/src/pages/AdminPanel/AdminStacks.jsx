import { useSelector, useDispatch } from 'react-redux';
import stackSlice from '../../redux/stacks/stackSlice.js';
import React, { useEffect, useState } from 'react';
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {
  setStacksList,
  selectAllStacks,
} from '../../redux/stacks/stackSlice.js';
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
function AdminStacks() {
  const params = useParams();

  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [showAddEditModal, setAddEditModal] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    stackName: '',
    stackPercentage: '',
    stackImage: '',
  });
  const dispatch = useDispatch();
  const { stacksList, loading, error } = useSelector(selectAllStacks);
  const stacksData = async () => {
    try {
      const response = await fetch('/api/stacks/getAll');
      const data = await response.json();

      if (data.status === 'success') {
        dispatch(setStacksList(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    stacksData();
  }, []);
  const handleChange = () => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //populate initial data

  const currentStackData = async () => {
    const response = await fetch(`/api/stacks/getSingleStack/${params.itemId}`);
    const data = await response.json();

    if (data.status == 'success') {
      setFormData({ ...data.data });
    }
  };
  // useEffect(() => {
  //   currentStackData();
  // }, [params]);

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
          setFormData({ ...formData, stackImage: downloadURLL });
        });
        setUploading(false);
      }
    );
  };
  const handleSubmit = async () => {
    if (selectedItemForEdit) {
      const response = await fetch('/api/stacks/update/id');
    } else {
      const response = await fetch('/api/stacks/create');
    }
  };
  return (
    <div>
      <div>
        <button
          type="buttton"
          onClick={() => {
            setSelectedItemForEdit(false);
            setAddEditModal(true);
            currentStackData();
          }}
          className="flex justify-start btn mt-8"
        >
          Add New Stack
        </button>
      </div>
      <div className="grid grid-cols-6 gap-5">
        {stacksList &&
          stacksList.map((stack) => (
            <div
              key={stack.id}
              className="flex flex-col justify-center items-center border-2 border-neutral-400 mt-8 p-8  "
            >
              <h1 className="text-white font-bold">{stack.stackName}</h1>
              <img
                src={stack.stackImage}
                alt="stack image"
                className="w-8 md:w-12 h-8 md:h-12 my-4"
              />
              <p>{stack.stackPercentage}</p>
              <div className="flex flex-row gap-4 justify-end mt-8">
                <button className="btn bg-red-700 text-white font-normal">
                  Delete
                </button>
                <Link to={`/admindashboard/${stack.id}`}>
                  <button
                    className="btn px-4 "
                    onClick={() => {
                      setSelectedItemForEdit(true);
                      setAddEditModal(true);
                      // currentStackData();
                    }}
                  >
                    Edit
                  </button>
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
          <form>
            <h1 id="modal-title">
              {selectedItemForEdit ? 'Edit stack' : 'add a new stack'}
            </h1>
            <div className="flex flex-col py-4">
              <label htmlFor="name" className="flex justify-start text-white">
                category
              </label>
              <input
                id="category"
                type="text"
                className="input"
                onChange={handleChange}
                defaultValue={formData.category}
              />
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="name" className="flex justify-start text-white">
                Stack Name
              </label>
              <input
                id="stackName"
                type="text"
                className="input"
                onChange={handleChange}
                defaultValue={formData.stackName}
              />
            </div>
            <div className="flex flex-col py-4">
              <label htmlFor="name" className="flex justify-start text-white">
                Stack Knowledge Percentage
              </label>
              <input
                id="stackPercentage"
                type="number"
                className="input"
                onChange={handleChange}
                defaultValue={formData.stackPercentage}
              />
            </div>

            <div className="flex flex-col py-4">
              <label htmlFor="name" className="flex justify-start text-white">
                Stack Image
              </label>
              <input
                id="stackImage"
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
                  <span className="text-green-700 ">
                    File successfuly uploaded
                  </span>
                ) : (
                  ''
                )}
              </p>
            </div>
            <div className="flex flex-row gap-4 justify-end mt-8">
              <button className="btn bg-red-700 text-white font-normal">
                Cancel
              </button>
              <button className="btn px-4 ">
                {selectedItemForEdit ? 'Update' : 'Add Stack'}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminStacks;
