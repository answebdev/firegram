import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ selectedImg, setSelectedImg }) => {
  // Close image modal when clicking on backdrop.
  const handleClick = (e) => {
    // The image is inside the backdrop, so clicking on the image can also actually close the modal too.
    // But we only want to close the modal when we click the backdrop and not when the image is clicked too.
    // So, we need to check for event target object to make sure that what we click on is the div for the 'backdrop' (see div below: className='backdrop'),
    // and NOT the image, which is the source of the event.
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  return (
    <motion.div
      className='backdrop'
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg}
        alt='enlarged pic'
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
      />
    </motion.div>
  );
};

export default Modal;
