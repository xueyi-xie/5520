import { collection, addDoc } from "firebase/firestore";
import { database } from "./firebaseSetUp";


export async function writeToDB(collectionName, data) {
  //addDoc()
  try {
    const docRef = await addDoc(collection(database, collectionName), data); 
  } catch (e) {
    console.log("Error adding document: ", e);
}
  
}