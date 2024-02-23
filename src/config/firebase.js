// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAeKCFrtsd63W3YoRYO30wduBbIbpEkl8",
  authDomain: "vite-contacts-f9274.firebaseapp.com",
  projectId: "vite-contacts-f9274",
  storageBucket: "vite-contacts-f9274.appspot.com",
  messagingSenderId: "1062499087472",
  appId: "1:1062499087472:web:dbf63903829811e71fb0b5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //reference of DB
