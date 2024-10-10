
import { StyleSheet} from "react-native";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from "react-native";
import Warning from "./Components/Warning";
const Stack = createNativeStackNavigator();

export default function App() {
  return(
  <NavigationContainer>
    <Stack.Navigator
    screenOptions={{title: "Home Page", headerStyle: {backgroundColor:"purple"}, headerTintColor: "white",}}>

      <Stack.Screen name="Home" component={Home} options={{}}/>
      <Stack.Screen 
      name="Details" 
      component={GoalDetails}
      options={({navigation, route})=>{return {
        title:route.params ? route.params.goalObj.text : "More details",
         headerRight: ()=>(<Button
          title="Warning"
          onPress={() => {
            navigation.setOptions({ title: "Warning" }); 
            navigation.navigate("Warning"); // Navigate to Warning screen
          }}
          color="white"
        />)
      }}}
      />
      <Stack.Screen 
      name="Warning"
      component={Warning}
      options={{}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
