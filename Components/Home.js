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
import { useEffect, useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { app } from "./Firebase/firebaseSetUp";
import { database } from "./Firebase/firebaseSetUp";
import { deleteAllFromDB, deleteFromDB, writeToDB } from "./Firebase/firestoreHelper";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

export default function Home({ navigation }) {
  console.log(database);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const appName = "My app";


  //querySnapshot is a list of document snapshots. we name it so 
  //.data() function gets data from document
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'goals'), (querySnapshot) => {
      //define an array
      let goalsArray = [];
      querySnapshot.forEach((doc)=>{
        //populate array
        goalsArray.push({...doc.data(), id: doc.id});
        console.log(doc.data().id)});
        //set goals with this array
        setGoals(goalsArray);

      });
      //detach listener
      //forgot to switch branch before pushing
      return () => unsubscribe();

  }, []);//one time thing, use square brackets




  //update this fn to receive data
  function handleInputData(data) {
    let newGoal = { text: data};
    // update the goals array to have newGoal as an item
    //async
    //add newGoal to db, call writeToDB
    writeToDB("goals", newGoal);

    {/*setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    */}

    //updated goals is not accessible here
    setIsModalVisible(false);
  }
  function dismissModal() {
    setIsModalVisible(false);
  }


  function goalDeleteHandler(deletedId) {

    deleteFromDB("goals", deletedId);
  }

  function deleteAll() {
    {/*}
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
        },
      },
      { text: "No", style: "cancel" },
    ]);
    */}
  deleteAllFromDB("goals");
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
        {/*<Button
          title="Add a Goal"
          onPress={() => {
            setIsModalVisible(true);
          }}
        />*/}
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
        {/* <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id} style={styles.textContainer}>
                <Text style={styles.text}>{goalObj.text}</Text>
              </View>
            );
          })}
        </ScrollView> */}
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