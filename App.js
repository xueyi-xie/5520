import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";

export default function App() {
  const appName = "My first mobile app";
  const focus = true;
  const [data, setData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function handleInputData(data) {
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
});
