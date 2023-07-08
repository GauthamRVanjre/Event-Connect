// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "@firebase/auth";
// import {
//   API_KEY,
//   APP_ID,
//   AUTH_DOMAIN,
//   MESSAGING_SENDER,
//   PROJECT_ID,
//   STORAGE_BUCKET,
// } from "./firebase-config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-TcXldsexDTGH-0LpdQKE5Y63xG7GlMQ",
  authDomain: "eventconnect-bd75a.firebaseapp.com",
  projectId: "eventconnect-bd75a",
  storageBucket: "eventconnect-bd75a.appspot.com",
  messagingSenderId: "820272170787",
  appId: "1:820272170787:web:d8780303f6f5b99bb7ee96",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
