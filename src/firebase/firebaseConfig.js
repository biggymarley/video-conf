import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXtecVVmZme2q4S8SjY4xY6HJYX6e-d98",
  authDomain: "videocalls-23b90.firebaseapp.com",
  projectId: "videocalls-23b90",
  storageBucket: "videocalls-23b90.appspot.com",
  messagingSenderId: "208088137170",
  appId: "1:208088137170:web:909bcce7f42f65fe361c0b",
  measurementId: "G-G5MTC4T3RY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// const storage = getStorage(app);
export { auth, db };
