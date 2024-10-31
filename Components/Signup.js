import { StyleSheet, Text, View, Alert} from 'react-native'
import React from 'react'

export default function Signup({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const loginHandler = () => {
        navigation.replace('Login');
    };

    const signupHandler = async () => {
        try{
            if (password !== confirmPassword) {
                Alert.alert("Passwords do not match");
                return;
            }
            if (
                email.Length === 0 ||
                password.Length === 0 ||
                confirmPassword.Length === 0
            ) {
                Alert.alert("Please fill in all fields");
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(
                password
            );
        } catch (e) {
            console.log("Error signing up: ", e);
            Alert.alert("Error signing up: ", e);
        }
    };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "stretch",
        justifyContent: "center",
      },
      input: {
        borderColor: "#552055",
        borderWidth: 2,
        width: "90%",
        margin: 5,
        padding: 5,
      },
      label: {
        marginLeft: 10,
      },
})