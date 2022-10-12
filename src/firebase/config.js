// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeOz_whLKn9xybBbenDozqWmXsN2GykeY",
  authDomain: "react-cursos-ca907.firebaseapp.com",
  projectId: "react-cursos-ca907",
  storageBucket: "react-cursos-ca907.appspot.com",
  messagingSenderId: "564352279706",
  appId: "1:564352279706:web:51739830965e8359126b23",
  measurementId: "G-L9NCP9KG9B"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB   = getFirestore(FirebaseApp)