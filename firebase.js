// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEhfziqgwK8RqyymopjRxH6rbUyG7z9kE",
    authDomain: "voyageverse-d3c71.firebaseapp.com",
    projectId: "voyageverse-d3c71",
    storageBucket: "voyageverse-d3c71.firebasestorage.app",
    messagingSenderId: "396090703190",
    appId: "1:396090703190:web:cd290888b0d98315a3aaf7"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);