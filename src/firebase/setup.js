//! Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
//* https://firebase.google.com/docs/web/setup#available-libraries

//? Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBvENrOezvUTzl1bOIUaXA4oHxYdJdOzmk",
  authDomain: "dubbydrive.firebaseapp.com",
  projectId: "dubbydrive",
  storageBucket: "dubbydrive.appspot.com",
  messagingSenderId: "1014771662045",
  appId: "1:1014771662045:web:df36c677e14c8b36156f34",
  measurementId: "G-0F1REL9C17"
};

//! Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);








