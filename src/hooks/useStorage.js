// To communicate with Firebase Storage, we need to use the Firebase Storage SDK.
// We already set this up ('projectStorage') and exported it in 'config.js' -> see last line: export {projectStorage,...}
// We could easily import this in our UploadForm.js file,
// and use it in there to interact with Firebase storage and upload the image the user selects.

// But we want to keep all our Firebase logic SEPARATE from the components.
// So we're going to create a custom hook to handle file uploads and Firebase storage (a 'hook' is just a function).
// This file holds this custom hook.

// Note we need to import the project storage ('projectStorage') from the 'config.js' file.
import { useState, useEffect } from 'react';
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from '../firebase/config';

// Our custom hook - responsible for handling file uploads
// and returning some useful value about that upload, such as the upload progress, any errors from the upload, and the image URL after it's been loaded (see state).

// This takes a parameter ('file'), and that parameter is the file we're trying to upload -
// this comes from 'UploadForm.js' and is the file the user selects.
const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  // We want to use the 'projectStorage' SDK to upload the 'file' that we get inside this hook.
  // And once its uploaded, we want to get the image URL and store it in the Firebase database.
  // That way, our database will contain a list of all image URLs.
  // And then, we can use that data to load the images in our component.

  // The code for this needs to run EVERY time we get a new file value.
  // And that's because this file value can change over time, as a user selects different files.
  // Therefore, we put all of our logic inside a 'useEffect' hook.

  // So what happens is, this function inside the 'useEffect' is going to fire
  // every time the dependency in the array below ('file') changes.
  // So every time we have a new 'file' value, it's going to run the code inside this 'useEffect' function to upload that file.
  useEffect(() => {
    // Make a reference to a collection that we want to save the image document to -
    // we'll call this collection 'images'
    const collectionRef = projectFirestore.collection('images');

    // This is where all of the logic to upload the file will go.

    // Get a reference to where the file should be saved.
    // References - using 'ref()' method - remember, we have a 'name' on the 'file' object that we take in as a parameter up above (e.g., 'travel.png').
    // This creates a reference to a file inside the default Firebase storage bucket:
    const storageRef = projectStorage.ref(file.name);

    // The 'put()' method will take the file and put it in the reference - that location.
    // This sets about uploading the file to its reference: 'projectStorage.ref(file.name)'.
    // This is asynchronous (it takes some time to do) - we can attach a listener to it ('state_changed'), which is going to fire functions when certain events happen.
    // So, whenever the state of the upload changes - whenever the progress changes, or whenever it's complete - then, we're going to fire a function.
    // And inside the function, we get a snapshot object ('snap').
    // And this is basically a snapshot in time of the upload at that moment in time.
    // This may happen a number of times during the cycle of the upload, so this function might be fired several times while the file is being uploaded.
    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        // Determine the progress of the upload. ('percentage' will be for the progress percentage of the upload).
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);

        // This function will fire if there's an error with the upload.
      },
      (err) => {
        setError(err);

        // This function fires when the upload is complete.
      },
      async () => {
        // Get URL of uploaded image.
        const url = await storageRef.getDownloadURL();

        // Save image URL to the Firestore (we need to, then, import 'projectFirestore' up above from 'config.js'),
        // so that we can save the URL of the uploaded images in Firebase,
        // so we can use this to render the images in the browser.

        const createdAt = timestamp();
        // The 'createdAt' Firebase time stamp is created in the 'config.js' file - see file.
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );

    // The dependency inside this array is the 'file'.
  }, [file]);

  // Return the three values from up above in the state.
  return { progress, url, error };
};

export default useStorage;
