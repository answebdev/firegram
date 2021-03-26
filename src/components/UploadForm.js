import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // We need to make sure file selected/uploaded is an image, and not, for example, an image file - check file 'type' using the 'type' property.
  // Create an array of allowed file types.
  // Specify the different image types allowed in this array.
  const types = ['image/png', 'image/jpeg'];

  const changeHandler = (e) => {
    // Access file user selects from their computer.
    // The 'files' property gets us all of the files that have been selected.
    // We just want the first file selected, so pass in a '0' (it's an array) to select the first file
    // (some uploaders allow you to select multiple files, which is why it's possible to select multiple files).
    let selected = e.target.files[0];
    // console.log(selected);

    // Store selected file in state.
    // We only want to update the state if a file is selected (the user can always just hit the 'cancel' button):
    // if a file is selected...true, then set the state: 'setFile(selected)'. If not, false...then don't update the state.

    // Also: && types.includes(selected.type)
    // To check that the type of file user has is one of the allowed types (see array const above).
    // So, does the array include the type that the user has selected.
    // Because we do not want to set the state for a video, for example, only for the allowed file types,
    // so we also need to include this in the if-statement.
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      // Set error to an empty string so that the error message is not displayed if an image of the allowed type is selected.
      setError('');
    } else {
      // If it's false, set state to 'null' to reset the value (either because they didn't choose anything to upload - nothing selected -
      // or the file type they selected was not of the allowed type, e.g., video).
      setFile(null);

      // Error message.
      setError('Please select an image file (png or jpeg)');
    }
  };

  return (
    <form>
      <label>
        <input type='file' onChange={changeHandler} />
        <span>+</span>
      </label>
      <div className='output'>
        {/* Display error message: */}
        {error && <div className='error'>{error}</div>}

        {/* Display name of selected file: */}
        {file && <div>{file.name}</div>}

        {/* Only show the progress bar when a file is selected.
         We also need to pass 'file' into the progress bar because
         we're going to use the 'useStorage' custom hook inside the ProgressBar component,
         and we need to pass the file into that.
         We also pass the 'setFile' function, so that when the progress is complete,
         we can set the file back to 'null', and then, the progress bar doesn't show again. */}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
