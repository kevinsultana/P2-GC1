// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj7hpDY7LN7LHwQTJPjpvgf_gJnu-trm0",
  authDomain: "p2-gc01.firebaseapp.com",
  projectId: "p2-gc01",
  storageBucket: "p2-gc01.firebasestorage.app",
  messagingSenderId: "692085629125",
  appId: "1:692085629125:web:9548ae1b6dcd2373ccd0ac",
  measurementId: "G-E5HCZJMFPW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
