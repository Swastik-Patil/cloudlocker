import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBeau8D43vxltxf_TPVICYgbsEyIxGzCpA",
  authDomain: "cloudlocker-as-saas.firebaseapp.com",
  databaseURL:
    "https://cloudlocker-as-saas-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cloudlocker-as-saas",
  storageBucket: "cloudlocker-as-saas.appspot.com",
  messagingSenderId: "900831270504",
  appId: "1:900831270504:web:5c5349380cb332b3884ddd",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export { storage, database };
