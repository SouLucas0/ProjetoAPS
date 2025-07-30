// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "sioa-scfat",
  appId: "1:1086291662753:web:9e4d1a1ed0b4347e6f9de0",
  storageBucket: "sioa-scfat.firebasestorage.app",
  apiKey: "AIzaSyAnH_jx6NievD-MnXpGi8LNhuYc6hWFJOQ",
  authDomain: "sioa-scfat.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "1086291662753"
};

// Initialize Firebase
let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp;