import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

// The images we pass in is the images collection from the database.

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  // Communicate with the database in order to get the documents.
  // All of this communication goes inside the 'useEffect' hook,
  // so that it can rerun wheneer the collection changes right here.
  // So, this is going to fire whenever the 'collection' dependency changes.
  useEffect(() => {
    // Use 'projectFirestore' in order to reach into a collection,
    // and then listen for the documents inside that collection.
    // The 'onSnapshot' method fires a callback function every time a change occurs inside this collection.
    // This callback function takes in a snapshot object ('snap').
    // And this snapshot object represents a snapshot at that moment in time of the database collection.
    // So essentially we're listening to realtime data updates - every time a new image is added to the database,
    // we are notified of this snapshot.

    // 'unsub' means 'unsubscribe'.
    const unsub = projectFirestore
      .collection(collection)

      // Order the documents in the collection before we retrieve them - order them by time created (createdAt).
      // And we also want them in 'descending' order (the newest will be shown at the top).
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        // Create an array of documents (which we will eventually return - down below: 'return { docs }').
        let documents = [];

        // Cycle through the documents currently in the database collection at that moment in time when we get that snapshot.
        snap.forEach((doc) => {
          // Then push the document for each document into the array.
          // Use the spread to get all of the properties (url and createdAt), and then the ID -
          // this ID is what we will use for the 'key' when we output each image.
          document.push({ ...doc.data(), id: doc.id });
        });
        // Update the documents.
        setDocs(documents);
      });

    // If we are not showing the ImageGrid component, then we don't need the images anymore.
    // So, we're going to return a cleanup function, and this function is going to invoke the 'unsub' method we created above.
    // And all this does is unsubscribe from the collection when we no longer use it.
    return () => unsub();
  }, [collection]);

  return { docs };
};
