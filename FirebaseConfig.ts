
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVGkpWPHRSjyE1sN53Ss974FMqrZq1kNg",
  authDomain: "chatgpt-5a356.firebaseapp.com",
  projectId: "chatgpt-5a356",
  storageBucket: "chatgpt-5a356.appspot.com",
  messagingSenderId: "1056005343913",
  appId: "1:1056005343913:web:2e828db5abfae6fd4ef7b8",
  measurementId: "G-0W9XNLQYXR"
};


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const storage = getStorage(app)
