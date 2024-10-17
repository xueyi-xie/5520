import { collection, doc, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import { database } from "./firebaseSetUp";


export async function writeToDB(collectionName, data) {
  //addDoc()
  try {
    await addDoc(collection(database, collectionName), data); 
} catch (e) {
    console.log("Error adding document: ", e);
}
}

export async function deleteFromDB(collectionName, id) {
  //deleteDoc()
  try {
    await deleteDoc(doc(database, collectionName, id));
  } catch (e) {
    console.log("Error deleting document: ", e);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((doc) => {
      deleteFromDB(collectionName, doc.id);
    });
  } catch (e) {
    console.log("Error deleting all documents: ", e);
  }
}