// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-0NqpYEA6HSK71kHUt_9RlkZ1Ew1JGeg",
  authDomain: "raman-580ea.firebaseapp.com",
  projectId: "raman-580ea",
  storageBucket: "raman-580ea.firebasestorage.app",
  messagingSenderId: "303012339451",
  appId: "1:303012339451:web:13e905e93e547a41c21a5e",
  measurementId: "G-69RKCGJJXY"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

