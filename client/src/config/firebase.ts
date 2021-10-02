import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAfSVxePmGQSgOBV2p5C8BC9tL1ZitdzH8',
  authDomain: 'covid-tracker-3a3f1.firebaseapp.com',
  projectId: 'covid-tracker-3a3f1',
  storageBucket: 'covid-tracker-3a3f1.appspot.com',
  messagingSenderId: '348711107491',
  appId: '1:348711107491:web:ccd4e60a88b2847543f816',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const storage = firebase.storage;
