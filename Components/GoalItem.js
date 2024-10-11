import { Button, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function GoalItem({ goalObj, handleDelete, separator, index}) {
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
        onLongPress={() => {Alert.alert("Delete", "Are you sure you want to delete", [
          { text: "cancel", style: "cancel" },
          {text: "delete",
            onPress: () => {
              handleDelete(goalObj.id);
            },
          },
        ]);}}
        onPressIn={()=>separator.highlight()} // Highlight separator on press
        onPressOut={() => separator.unhighlight()} // Unhighlight separator when released
      >
        <Text style={styles.text}>{goalObj.text}</Text>
      
      <PressableButton 
        pressFunction={()=> {handleDelete(goalObj.id);}}
        componentStyle={styles.deleteContainer}
        pressedStyle={styles.pressed}
      >
        <AntDesign name="delete" size={24} color="black" />
      </PressableButton>
      <PressableButton
        pressFunction={()=> {navigation.navigate("Details", { goalObj });}}
        componentStyle={styles.detailContainer}
        pressedStyle={styles.pressed}
      >
        <AntDesign name="infocirlce" size={24} color="black" />
      </PressableButton>
      </Pressable>
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
    justifyContent: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //width: "100%",
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: "lavender",
  },
  deleteContainer: {
    backgroundColor:'red',
    width: 25,
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    backgroundColor: 'beige',
    width: 25,
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});