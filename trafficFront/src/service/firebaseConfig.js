// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIB7iSDUxiTSIPoKXZ6CMDa82CXZD-cNU",
  authDomain: "rpiv-a0892.firebaseapp.com",
  projectId: "rpiv-a0892",
  storageBucket: "rpiv-a0892.appspot.com",
  messagingSenderId: "1064071646097",
  appId: "1:1064071646097:web:769f8b355ee998d3946830",
  measurementId: "G-K8RLJM7BQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);