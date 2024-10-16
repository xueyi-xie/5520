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
import { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";

export default function Home({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const appName = "My app";
  //update this fn to receive data
  function handleInputData(data) {
    //log the data to console
    console.log("App ", data);
    // declare a JS object
    let newGoal = { text: data, id: Math.random() };
    // update the goals array to have newGoal as an item
    //async
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    //updated goals is not accessible here
    setIsModalVisible(false);
  }
  function dismissModal() {
    setIsModalVisible(false);
  }

  // function goalPressHandler(pressedGoal) {
  //   //which goal?
  //   console.log("goal pressed");
  //   navigation.navigate("Details", { goalObj: pressedGoal });
  // }
  function goalDeleteHandler(deletedId) {
    console.log("goal deleted ", deletedId);
    //Use array.filter to update the array by removing the deletedId

    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => {
        return goal.id != deletedId;
      });
    });
  }
  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
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