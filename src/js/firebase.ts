// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDIkaOPTmQ_xQm7g-Py5ofeKAYH3Ar0Gas",
  authDomain: "the-clock-app.firebaseapp.com",
  projectId: "the-clock-app",
  storageBucket: "the-clock-app.appspot.com",
  messagingSenderId: "419663343957",
  appId: "1:419663343957:web:dd62183d529fb3587fbfdc",
  measurementId: "G-77Q4LW245P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
