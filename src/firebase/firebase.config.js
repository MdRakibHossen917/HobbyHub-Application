import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJ0xveAMDVgDytTLP75-w4Zw-3D2c70-c",
  authDomain: "hobbyhub-auth.firebaseapp.com",
  projectId: "hobbyhub-auth",
  storageBucket: "hobbyhub-auth.firebasestorage.app",
  messagingSenderId: "946088378264",
  appId: "1:946088378264:web:a5dcb87e3c01bebe1075ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
