import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "connect-d960d.firebaseapp.com",
  projectId: "connect-d960d",
  storageBucket: "connect-d960d.firebasestorage.app",
  messagingSenderId: "394455385416",
  appId: "1:394455385416:web:8eb2fe80aa60c194885f7d"

};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
