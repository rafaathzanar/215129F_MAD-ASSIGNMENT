import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBK_1rSBCsiu-E0TAYzOHj4CP3s33oaFjI",
  authDomain: "mad-assignment-2a8dd.firebaseapp.com",
  projectId: "mad-assignment-2a8dd",
  storageBucket: "mad-assignment-2a8dd.firebasestorage.app",
  messagingSenderId: "740333850995",
  appId: "1:740333850995:web:2853a8678100ce2b6d3506",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
