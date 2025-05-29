import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  initializeAuth, 
  browserLocalPersistence,
  getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
    apiKey: "AIzaSyA7FZdK6dS6q9T52nXj_cnQw24ikMaxkXU",
    authDomain: "nfc-card-d8fc7.firebaseapp.com",
    projectId: "nfc-card-d8fc7",
    storageBucket: "nfc-card-d8fc7.firebasestorage.app",
    messagingSenderId: "655728032199",
    appId: "1:655728032199:web:84d04e4db0d79f7b20c1e2",
    measurementId: "G-6J47HQ2Q9L"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Configure Firebase Auth persistence
const auth =
  Platform.OS === "web"
? getAuth(app)  // Default auth for web
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage), // Using AsyncStorage for React Native
      });

const db = getFirestore(app);

export { auth, db, app };