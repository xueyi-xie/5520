import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, FlatList, Alert } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";
import GoalItem from "./Components/GoalItem";

export default function App() {
  const appName = "My first mobile app";
  const focus = true;
  const [data, setData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const [listCount, setListCount] = useState(0);
  

  function handleInputData(data) {
    let newGoal={text: data, id: Math.random()};
    //const newArray=[...goals, newGoal];
    //setGoals(newArray);
    setListCount(listCount+1);
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

  function goalDeleteHandler(deletedID){
    //need ID to filter array

  }

  function handleDeleteAll(){
    Alert.alert(
      "Delete all", 
      "Are you sure?",
      [{text: "No",
        onPress: () => console.log("Action cancelled"), 
      }, 
    {text: "Yes",
      onPress: () => {
        setGoals([]);
        setListCount(0);
      },
    },
  ],
  {cancelable: true},
  )
  }

  const listSeparator = () => {
    return <View style={ styles.separator } />
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

        <SafeAreaView style={styles.listContainer}>
          {/*{listCount===0 ? <Text>{"No goals to show"}</Text>:<Text>{"My Goal List"}</Text>}*/}
          {/*if (listCount=0){
            <Text>No goals to show</Text>
          } else {
            <Text>My Goal List</Text>
          };*/}
        <FlatList data={goals} renderItem={({item})=>{
          console.log(item);
          return (
            /*
            <View key={item.id}>
              <Text>{item.text}</Text>
            </View>
            */
           <GoalItem goal={item} handleDelete={goalDeleteHandler}/>
          )
        }}
        ListEmptyComponent={<Text style={styles.text}>{"No goals to show"}</Text>}
        ListHeaderComponent={listCount>0 ? <Text style={styles.text}>{"My Goals"}</Text>:null}
        ListFooterComponent={listCount>0 ? <Button title="Delete All" onPress={handleDeleteAll}/> : null}
        ItemSeparatorComponent={listSeparator}
        />
        </SafeAreaView>
        {/*<Text>{data}</Text>*/}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    fontSize: 20,
  },
  listContainer: {
    flex: 1,
  }, 
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
    justifyContent: "center",
  },
  scrollViewContent: {
    flex: 1,
    alignItems: "center",
  }, 
  separator: {
    height: 5,
    width: '100%',
    backgroundColor: 'black',
    },
});
