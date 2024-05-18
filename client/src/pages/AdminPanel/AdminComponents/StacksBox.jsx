import React from 'react';

function StacksBox() {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      {/* <Modal
        open={showAddEditModal}
        onClose={() => setAddEditModal(false)}
        aria-labelledby="modal-title"
      >
        <h1 id="modal-title">
          {selectedItemForEdit ? 'Edit stack' : 'add a new stack'}
        </h1>
        <form>
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
      </Modal> */}
    </div>
  );
}

export default StacksBox;
