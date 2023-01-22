// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBpPb-JHkxqnM-GGSJxD_Fdu3aXSoottf4",
    authDomain: "fir-auth-8976a.firebaseapp.com",
    projectId: "fir-auth-8976a",
    storageBucket: "fir-auth-8976a.appspot.com",
    messagingSenderId: "423031537530",
    appId: "1:423031537530:web:e646b01107fba6450ae0c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)