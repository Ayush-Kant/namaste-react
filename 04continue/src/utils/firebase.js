import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyhZ8xlkeF-LsF1xRsN4zWYXGptprSAG0",
  authDomain: "foody-78ee0.firebaseapp.com",
  projectId: "foody-78ee0",
  storageBucket: "foody-78ee0.firebasestorage.app",
  messagingSenderId: "619538988293",
  appId: "1:619538988293:web:bfd9202269b5d269938b6c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;