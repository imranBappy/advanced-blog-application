// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkTRH3Y81lAnmoqZDMZNANKny9j1o2TGQ",
    authDomain: "blog-6a325.firebaseapp.com",
    projectId: "blog-6a325",
    storageBucket: "blog-6a325.appspot.com",
    messagingSenderId: "164852073882",
    appId: "1:164852073882:web:5d15c4f5b5cbae75c46623",
    measurementId: "G-6TY9XLQYE3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);