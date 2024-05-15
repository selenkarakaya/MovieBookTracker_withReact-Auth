// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "your_key",
  authDomain: "your_domain.firebaseapp.com",
  projectId: "project_name",
  storageBucket: "project_name.appspot.com",
  messagingSenderId: "your_id",
  appId: "your_appID",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
