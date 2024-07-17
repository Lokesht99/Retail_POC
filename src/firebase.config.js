import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "genai-retail.firebaseapp.com",
  projectId: "genai-retail",
  storageBucket: "genai-retail.appspot.com",
  appId: "1:871810539256:web:f21374fb3aef1a9a51650d"
});
export const firestore = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
