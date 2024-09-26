import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, FlatList } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";

export default function App() {
  const appName = "My first mobile app";
  const focus = true;
  const [data, setData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  

  function handleInputData(data) {
    let newGoal={text: data, id: Math.random()};
    //const newArray=[...goals, newGoal];
    //setGoals(newArray);
    setGoals((prevGoals)=>{
      return [...prevGoals, newGoal]
    });

    setData(data);
  }

  function handleModal() {
    setModalVisible(true);
  }

  function handleCancelModal() {
    setModalVisible(false); // Hide the modal
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.top}>
        <Header name={appName} />
        <Input
          shouldFocus={focus}
          inputHandler={handleInputData}
          modalVisible={modalVisible}
          onCancel={handleCancelModal}
        />
        <View style={styles.buttonContainer}>
          {/* "Add a goal" button */}
          <Button title="Add a goal" onPress={handleModal} />
        </View>
      </View>

      <View style={styles.bottom}>
        
        {/*<ScrollView contentContainerStyle={styles.scrollViewContent}>
        {goals.map((goalObj) => {
          return (
            <View key={goalObj.id}>
              <Text>{goalObj.text}</Text>
            </View>
          );
          })};
        </ScrollView>*/}
        <FlatList data={goals} renderItem={(data)=>{
          console.log(data);
          return (
            <View key={data.item.id}>
              <Text>{data.item.text}</Text>
            </View>
          )
        }}
        />
        <Text>{data}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottom: {
    flex: 4,
    backgroundColor: "#dcd",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  scrollViewContent: {
    alignItems: "center",
  }
});
