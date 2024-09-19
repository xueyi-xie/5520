import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView} from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";

export default function App() {
  const appName = "Xueyi's first mobile app";
  const focus = true;
  const [data, setData] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
 
  function handleInputData(data){
    setData(data)
  }
  function handleModal(){
    setModalVisible(true)
  }

  //prop name is random. eg. inputHandler and then pass it to Input.js
  return (

    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.top}>
        <Header name={appName}/>
        <Input shouldFocus={focus} inputHandler={handleInputData} modalVisible={modalVisible}/>
        <Button title="add a goal" onPress={handleModal}/>
      </View>
      <View style={styles.bottom}>
        <Text>{data}</Text>
      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  top:{
    flex: 1,
  },
  bottom:{
    flex: 4,
    backgroundColor:"lavender",
  }
  
});
