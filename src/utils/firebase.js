// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHGJijxJ0oGJAHFQFInJEM1wh23iWbqXM",
  authDomain: "netflixgpt-d2523.firebaseapp.com",
  projectId: "netflixgpt-d2523",
  storageBucket: "netflixgpt-d2523.firebasestorage.app",
  messagingSenderId: "1033067139566",
  appId: "1:1033067139566:web:82892db2c802065c0ffeff",
  measurementId: "G-9X279ZB5HE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);