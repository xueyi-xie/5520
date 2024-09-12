import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Header} from Header.js;

export default function App() {
  const appName = "Xueyi's first mobile app";
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
