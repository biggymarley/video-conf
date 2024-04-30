import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXtecVVmZme2q4S8SjY4xY6HJYX6e-d98",
  authDomain: "videocalls-23b90.firebaseapp.com",
  projectId: "videocalls-23b90",
  storageBucket: "videocalls-23b90.appspot.com",
  messagingSenderId: "208088137170",
  appId: "1:208088137170:web:909bcce7f42f65fe361c0b",
  measurementId: "G-G5MTC4T3RY",
  databaseURL: "https://videocalls.firebaseio.com",
};

const firebaseConfigBackup = {
  apiKey: "AIzaSyB6XTRKC1BX3Psy9bXHYoSPnOCLq054hcE",
  authDomain: "videcallbackup.firebaseapp.com",
  projectId: "videcallbackup",
  storageBucket: "videcallbackup.appspot.com",
  messagingSenderId: "556962119917",
  appId: "1:556962119917:web:560c5739efe2d89ab48ce4",
  measurementId: "G-121F01SYMT",
  databaseURL: "https://videcallbackup-default-rtdb.firebaseio.com/",

};


const app = initializeApp(firebaseConfigBackup);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);
export { auth, db, database, storage };
