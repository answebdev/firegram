import React from 'react';

// We want to access the data from our Firestore database,
// so we can cycle through those image URLs and output images for each one of them.
// And we want to do that here in this component.

// To do this, we're going to create another custom hook called 'useFirestore' to do this for us.
// That way, we make our code more reusable.
// So, anytime we want to get Firestore data from a collection,
// we can just use this 'useFirestore' hook.

const ImageGrid = () => {
  return <div className='img-grid'>images</div>;
};

export default ImageGrid;
