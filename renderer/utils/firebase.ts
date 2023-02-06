import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyB45JeFi289pOXXtayyADSW6qI7JwP2BZ4",
  authDomain: "nextron-chat-app-ead2b.firebaseapp.com",
  projectId: "nextron-chat-app-ead2b",
  storageBucket: "nextron-chat-app-ead2b.appspot.com",
  messagingSenderId: "326376072213",
  appId: "1:326376072213:web:3b20bf1428ce861e075a1c",
  measurementId: "G-8SVY52GB5H",
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const fireStore = getFirestore(app);
