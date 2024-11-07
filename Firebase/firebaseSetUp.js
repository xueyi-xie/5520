// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth , getReactNativePersistence} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_apiKey,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  projectId: process.env.EXPO_PUBLIC_projectId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
};
console.log(firebaseConfig);
// const firebaseConfig = {
//   apiKey: "AIzaSyDYQG3bC8wrm78bo6-wjZZfmKvACPoxdNA",
//   authDomain: "project-4836269972286322047.firebaseapp.com",
//   projectId: "project-4836269972286322047",
//   storageBucket: "project-4836269972286322047.firebasestorage.app",
//   messagingSenderId: "158743138348",
//   appId: "1:158743138348:web:1c799caefe3c6217ddc189"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
