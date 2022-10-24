import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD8lX_e7tig5tJ-ECo226eQaDDRyNci_2I",
  authDomain: "userlogin-4e7f9.firebaseapp.com",
  projectId: "userlogin-4e7f9",
  storageBucket: "userlogin-4e7f9.appspot.com",
  messagingSenderId: "250813514241",
  appId: "1:250813514241:web:715e4bf19243300dddb600",
  measurementId: "G-9R0VSNTLL2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
