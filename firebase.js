import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCG8AElcocfs4zC1u-DkSYYK15bSPeD6gM",
    authDomain: "class-work-9829e.firebaseapp.com",
    projectId: "class-work-9829e",
    storageBucket: "class-work-9829e.appspot.com",
    messagingSenderId: "38208750084",
    appId: "1:38208750084:web:3c3031eeb337003873eb51",
    measurementId: "G-5JERZVB5KM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore, Cloud Storage and get a reference to the service
export const storage = getStorage(app);
export const db = getFirestore(app);
