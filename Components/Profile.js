import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../Firebase/firebaseSetUp";
import LocationManager from "./LocationManager";

export default function Profile() {
  // read auth.currentUser
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
      <LocationManager />
    </View>
  );
}

const styles = StyleSheet.create({});