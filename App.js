import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./Components/GoalDetails";
import Map from "./Components/Map";
import { Button } from "react-native";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { onAuthStateChanged } from "firebase/auth";
 import Profile from "./Components/Profile";
import PressableButton from "./Components/PressableButton";
const Stack = createNativeStackNavigator();
import AntDesign from "@expo/vector-icons/AntDesign";
import { auth } from "./Firebase/firebaseSetUp";

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => {
        return {
          title: "All My Goals",
          headerRight: () => {
            // render a button icon to navigate to Profile
            return (
              <PressableButton
                pressedFunction={() => {
                  navigation.navigate("Profile");
                }}
                componentStyle={{ backgroundColor: "purple" }}
              >
                <AntDesign name="user" size={24} color="white" />
              </PressableButton>
            );
          },
        };
      }}
    />

    <Stack.Screen
      name="Details"
      component={GoalDetails}
      options={({ navigation, route }) => {
        return {
          title: route.params ? route.params.goalObj.text : "More Details",
        };
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => {
        return {
          headerRight: () => {
            // render a button icon to navigate to Profile
            return (
              <PressableButton
                pressedFunction={() => {
                  try {
                    signOut(auth);
                  } catch (err) {
                    console.log("sign out ", err);
                  }
                }}
                componentStyle={{ backgroundColor: "purple" }}
              >
                <AntDesign name="logout" size={24} color="white" />
              </PressableButton>
            );
          },
        };
      }}
    />

    <Stack.Screen name="Map" component={Map} />
  </>
);
export default function App() {
  const [isUserLoggedIn, SetIsUserLoggedIn] = useState(false);
  useEffect(() => {
    //set up auth listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("listener ", user);
      // if user is not logged in we receive null
      // else we receive user data
      if (user) {
        SetIsUserLoggedIn(true);
      } else {
        SetIsUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
        }}
      >
        {
          // if user is not logged in show them AuthStack else show them AppStack
          isUserLoggedIn ? AppStack : AuthStack
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}