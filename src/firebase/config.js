// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:'AIzaSyA32WmJcueLrCo_iz6NbI0N9X60DRykZNo', /* import.meta.env.VITE_API_KEY, */
  authDomain:'journalapp-6ac4b.firebaseapp.com' /* import.meta.env.VITE_AUTH_DOMAIN */,
  projectId: 'journalapp-6ac4b' /* import.meta.env.VITE_PROJECT_ID */,
  storageBucket: 'journalapp-6ac4b.appspot.com' /* import.meta.env.VITE_STORAGE_BUCKET */,
  messagingSenderId: '593808133437' /* import.meta.env.VITE_MESSAGING_SENDER_ID */,
  appId: '1:593808133437:web:d834045631dd6cd6368954' /* import.meta.env.VITE_APP_ID */
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfig);
export const fireBaseAuth = getAuth(fireBaseApp)
export const fireBaseDB =  getFirestore(fireBaseApp)