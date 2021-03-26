import React from 'react';
import useFirestore from '../hooks/useFirestore';

// We want to access the data from our Firestore database,
// so we can cycle through those image URLs and output images for each one of them.
// And we want to do that here in this component.

// To do this, we're going to create another custom hook called 'useFirestore' to do this for us.
// That way, we make our code more reusable.
// So, anytime we want to get Firestore data from a collection,
// we can just use this 'useFirestore' hook.

const ImageGrid = () => {
  // We need to pass in the collection we want to listen to: 'images' (the name we gave our collection in Firebase).
  const { docs } = useFirestore('images');
  console.log(docs);

  return (
    <div className='img-grid'>
      {/* Make sure images exist before outputting them */}
      {docs &&
        docs.map((doc) => (
          <div className='img-wrap' key={doc.id}>
            <img src={doc.url} alt='uploaded pic' />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
