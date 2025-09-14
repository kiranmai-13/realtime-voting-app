// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5NbMtr6CKfyluIShXYeib3VB6x1NBXv8",
  authDomain: "voting-823e6.firebaseapp.com",
  databaseURL: "https://voting-823e6-default-rtdb.firebaseio.com",
  projectId: "voting-823e6",
  storageBucket: "voting-823e6.firebasestorage.app",
  messagingSenderId: "375059186939",
  appId: "1:375059186939:web:a338d5e450ae33435e9c5e",
  measurementId: "G-3PY1CYF09L"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
