// Import as 'firebase' instead of *
// Change - see here: https://stackoverflow.com/questions/64545862/upgrade-to-firebase-js-8-0-0-attempted-import-error-app-is-not-exported-from
// import * as firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCrkALwxBIua4orGz5GAlq-FyiHlh6w1As',
  authDomain: 'firegram-7d25b.firebaseapp.com',
  projectId: 'firegram-7d25b',
  storageBucket: 'firegram-7d25b.appspot.com',
  messagingSenderId: '584275435493',
  appId: '1:584275435493:web:90b5b8f668f2e9270b990c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Storage Service and Firestore Database
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

// Firebase created timestamp for images.
// Export this down below so we can use it elsewhere (e.g., in 'UseStorage.js').
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// Export Storage Service and Firestore Database so we can use them in other files
export { projectStorage, projectFirestore, timestamp };
