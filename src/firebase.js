// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC-0NqpYEA6HSK71kHUt_9RlkZ1Ew1JGeg",
  authDomain: "raman-580ea.firebaseapp.com",
  projectId: "raman-580ea",
  storageBucket: "raman-580ea.appspot.com", // corrected this URL
  messagingSenderId: "303012339451",
  appId: "1:303012339451:web:13e905e93e547a41c21a5e",
  databaseURL: "https://raman-580ea-default-rtdb.firebaseio.com", // corrected format
  measurementId: "G-69RKCGJJXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
getAnalytics(app); // Optional: only if you're using Analytics

export { auth, database };
