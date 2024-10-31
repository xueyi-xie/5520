import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signupHandler = () => {
        navigation.replace('Signup');
    };

    const loginHandler = async () => {};
    
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
    <Button title="Login" onPress={loginHandler} />
    <Button title="New User? Create An Account" onPress={signupHandler} />
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