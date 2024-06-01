// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBit-63d_ZpmEre1EYPMA74-VM129viFM",
  authDomain: "chat-app-8ab46.firebaseapp.com",
  projectId: "chat-app-8ab46",
  storageBucket: "chat-app-8ab46.appspot.com",
  messagingSenderId: "577184936070",
  appId: "1:577184936070:web:9e134b0c8b40847054e107"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');