
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALl1ag9J1SZrte8H1sUp6y8aWlhEvtrwQ",
  authDomain: "todo-4d078.firebaseapp.com",
  projectId: "todo-4d078",
  storageBucket: "todo-4d078.firebasestorage.app",
  messagingSenderId: "926521362126",
  appId: "1:926521362126:web:c22e2cc0c76f37d0fa729f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);