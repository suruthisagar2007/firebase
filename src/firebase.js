import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGE8RwnFcMr-OIEZRBj21OrE0_uabhmnE",
  authDomain: "to-do-list-5bddb.firebaseapp.com",
  projectId: "to-do-list-5bddb",
  storageBucket: "to-do-list-5bddb.firebasestorage.app",
  messagingSenderId: "597706487758",
  appId: "1:597706487758:web:808de9f468f3c51d4f9d9f"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };