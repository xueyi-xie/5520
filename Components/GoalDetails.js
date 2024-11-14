import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { updateDB, getAllFromDB } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import { getDownloadURL, ref } from "firebase/storage";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);
  const [downloadImageURL, setDownloadImageURL] = useState("");

  function warningHandler() {
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
    updateDB(route.params.goalObj.id, { warning: true }, "goals");
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressFunction={warningHandler}
            componentStyle={{backgroundColor: "blue"}}
            pressedStyle={styles.warningStyle}
          >
            <AntDesign name="warning" size={24} color="white" />
          </PressableButton>
        );
      },
    });
  }, []);
  useEffect(() => {
    async function getImageDownloadURL() {
      try {
        if (route.params && route.params.goalObj.imageUri) {
          const imageRef = ref(storage, route.params.goalObj.imageUri);
          const downloadURL = await getDownloadURL(imageRef);
          console.log(downloadURL);
          setDownloadImageURL(downloadURL);
        }
      } catch (err) {
        console.log("get download image URL ", err);
      }
    }
    getImageDownloadURL();
  }, []);

  return (
    <View>
      {route.params ? (
        <Text style={warning && styles.warningStyle}>
          Details of {route.params.goalObj.text} goal with
          {route.params.goalObj.id}
        </Text>
      ) : (
        <Text>More Details</Text>
      )}
      <Button
        title="More Details"
        onPress={() => {
          navigation.push("Details");
        }}
      />
      {route.params && <GoalUsers goalId={route.params.goalObj.id} />}
      {downloadImageURL && (
        <Image
          source={{ uri: downloadImageURL }}
          style={styles.image}
          alt="preview of goal image"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
  image: {
    height: 100,
    width: 100,
  }
});