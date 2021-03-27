import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';

// Use the 'useStorage' hook to upload the file.
// First, we need to get the props that were passed into the progress bar in 'UploadForm.js' (file, setFile) -
// Destructure them and pass them in.

const ProgressBar = ({ file, setFile }) => {
  // Use the 'useStorage' hook.
  // Get the URL once the upload is complete and the progress (which we 'return' at the bottom of 'useStorage'.js').
  const { url, progress } = useStorage(file);
  // console.log(progress, url);

  // Remove progress bar once image is loaded.
  // To do this, we need to set the value of 'file' back to 'null'.
  // Remember, we only show the progress bar if the file has a value.
  // And we want to set it to 'null' when we have a URL for the image,
  // because it is at this point that we know that the file is fully uploaded (because we only get the URL value
  // after the upload is complete).
  useEffect(() => {
    // If we have a valid value for the URL, and it's not null or undefined,
    // we then want to set the file to 'null', because then, the progress bar won't show anymore, which is what we want.
    if (url) {
      setFile(null);
    }
    // Pass in 'url' because we want this function to run when the URL changes.
    // We also need to pass in 'setFile' since we use it.
  }, [url, setFile]);

  // Style progress bar depending on percentage of upload done -
  // the 'width' property is going to be driven by to progress of the upload: 'width: progress'
  return (
    <motion.div
      className='progress-bar'
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
};

export default ProgressBar;
