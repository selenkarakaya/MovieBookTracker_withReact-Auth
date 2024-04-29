// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDom1OPzxSBSPV1BZVw0Ar8ZrGmmbw10Sc",
  authDomain: "moviebooktracker.firebaseapp.com",
  projectId: "moviebooktracker",
  storageBucket: "moviebooktracker.appspot.com",
  messagingSenderId: "418149547452",
  appId: "1:418149547452:web:eb1074043c44856c29ffb9",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
