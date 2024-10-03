
import { StyleSheet} from "react-native";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title: "Home Page", headerStyle: {backgroundColor:"purple"}, headerTintColor: "white"}}/>
      <Stack.Screen name="Details" component={GoalDetails}
      options={({navigation, route})=>{return {
        title:route.params ? route.params.goalObj.text : "More details",
        };
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
