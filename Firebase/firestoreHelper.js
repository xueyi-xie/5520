import { collection, doc, addDoc, deleteDoc, getDocs, updateDoc} from "firebase/firestore";
import { database } from "./firebaseSetUp";



export async function writeToDB(collectionName, data) {
  //addDoc()
  try {
    await addDoc(collection(database, collectionName), data); 
} catch (e) {
    console.log("Error adding document: ", e);
}
}

export async function deleteFromDB(collectionName, deletedID) {
  //deleteDoc()
  try {
    await deleteDoc(doc(database, collectionName, deletedID));
    //also delete all docs in the users subcollection
    deleteAllFromDB(`goals/${deletedID}/users`);
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

export async function updateDB(collectionName, id, data) {
  //updateDoc()
  try {
    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, data);
  } catch (e) { 
    console.log("Error updating document: ", e);
  }
}

export async function getAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    let newArray = [];
    querySnapshot.forEach((doc) => {
      newArray.push(doc.data());
    });
    return newArray;
  } catch (e) {
    console.log("Error getting documents: ", e);
  }
}