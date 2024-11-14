import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Pressable,
} from "react-native";
import Header from "./Header";
import { useEffect, useEffect, useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { database } from "../Firebase/firebaseSetUp";
import { deleteAllFromDB, deleteFromDB, writeToDB } from "../Firebase/firestoreHelper";
import { app } from "../Firebase/firebaseSetUp";
import { auth, database } from "../Firebase/firebaseSetUp";
import { deleteAllFromDB, deleteFromDB, writeToDB } from "../Firebase/firestoreHelper";
import { ref } from "firebase/storage";

export default function Home({ navigation }) {
  console.log(database);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app";
  const collectionName = "goals";

  //querySnapshot is a list of document snapshots. we name it so 
  //.data() function gets data from document
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(database, collectionName), 
      where ("owner", "==", auth.currentUser.uid)),
      (querySnapshot) => {
      //define an array
      let goalsArray = [];
      querySnapshot.forEach((doc)=>{
        goalsArray.push({...doc.data(), id: doc.id});
      });
        setGoals(goalsArray);
      }, 
        (error) => {console.log(error);
        Alert.alert("Error", "Something went wrong", [{text: "OK"}]);
      });

      //detach listener
      //forgot to switch branch before pushing
      return () => unsubscribe();

  }, []);//one time thing, use square brackets


  async function handleImageData(uri) {
    try {
      //fetch the image data
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`fetch error happened with status ${response.status}`);
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      console.log(uploadResult);
    } catch (err) {
      console.log("handle Image data ", err);
    }
  }

  //update this fn to receive data
  function handleInputData(data) {
    //log the data to console
    console.log("App ", data);
    if (data.imageUri) {
      handleImageData(data.imageUri);
    }
    // declare a JS object
    let newGoal = { text: data.text };
    newGoal = { ...newGoal, owner: auth.currentUser.uid };
    // add the newGoal to db
    //call writeToDB
    writeToDB(newGoal, collectionName);

    // update the goals array to have newGoal as an item
    //async

    // setGoals((prevGoals) => {
    //   return [...prevGoals, newGoal];
    // });
    //updated goals is not accessible here
    setIsModalVisible(false);
  }


  function goalDeleteHandler(deletedId) {
    deleteFromDB("goals", deletedId);
  }

  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          // setGoals([]);
          deleteAllFromDB(collectionName);
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <PressableButton
          pressFunction={() => {
            setIsModalVisible(true);}}
          componentStyle={styles.buttonContainer}
          pressedStyle={styles.pressed}
        >
          <Text>Add a Goal</Text>
        </PressableButton>
  
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        modalVisible={isModalVisible}
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList
          ListEmptyComponent={
            <Text style={styles.header}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length && <Text style={styles.header}>My Goals List</Text>
          }
          ListFooterComponent={
            goals.length && <Button title="Delete all" onPress={deleteAll} />
          }
          

          contentContainerStyle={styles.scrollViewContent}
          data={goals}

          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={{
                height: 5,
                backgroundColor: highlighted ? "red" : "gray", // Change separator color based on highlighted prop
              }}
            />
          )}
        
          renderItem={({ item, separators }) => (
              <GoalItem
                goalObj={item}
                handleDelete={goalDeleteHandler}
                separator={separators}
              />
          )}
          
        />
      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: 'purple',
    color: 'white',
    fontSize: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },

  topView: { flex: 1, alignItems: "center", justifyContent: "space-evenly" },
  bottomView: { flex: 4, backgroundColor: "#dcd" },

  scrollViewContent: {
    alignItems: "center",
  },

  pressed: {
    opacity: 0.5,
    backgroundColor: "lavender",
  },
});