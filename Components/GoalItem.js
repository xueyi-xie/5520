import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";

export default function GoalItem({ goalObj, handleDelete }) {
  const navigation = useNavigation();

  return (
    <View style={styles.textContainer}>
      <Pressable
        android_ripple={{ color: "purple" }}
        style={({pressed})=>{
          return [styles.horizontalContainer, pressed && styles.pressed];
        }}
        onPress={() => {
          navigation.navigate("Details", { goalObj });
        }}
      >
      <Text style={styles.text}>{goalObj.text}</Text>
      <PressableButton 
        pressFunction={()=> {handleDelete(goalObj.id);}}
        componentStyle={styles.deleteContainer}
        pressedStyle={styles.pressed}
      >
        <Text>X</Text>
      </PressableButton>
      <PressableButton
        pressFunction={()=> {navigation.navigate("Details", { goalObj });}}
        componentStyle={styles.detailContainer}
        pressedStyle={styles.pressed}
      >
        <Text>i</Text>
      </PressableButton>
        
      {/* 
      <Button
        title="X"
        onPress={() => {
          handleDelete(goalObj.id);
        }}
        color="grey"
      />
      <Button
        title="i"
        onPress={() => {
          // handlePress(goalObj);
          navigation.navigate("Details", { goalObj });
        }}
        color="grey"
      />
      */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    fontSize: 25,
    padding: 5,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  pressed: {
    opacity: 0.5,
    color: "purple",
  },
  deleteContainer: {
    backgroundColor:'red',
    width: 20,
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    backgroundColor: 'beige',
    width: 20,
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});