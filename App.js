
import { StyleSheet} from "react-native";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from "react-native";
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
        headerRight: ()=>{return <Button title="Warning" color="white"/>}
        };
        }
      }
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
