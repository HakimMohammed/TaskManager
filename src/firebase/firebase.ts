import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

const firebaseApp  = initializeApp(FIREBASE_CONFIG);

export const auth = getAuth(firebaseApp)
