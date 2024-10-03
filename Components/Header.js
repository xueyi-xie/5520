import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View>
      <Text style={styles.textStyle}>Welcome to {props.name}!</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  textStyle: {
    color: "purple",
    fontSize: 25,
    borderColor: "purple",
    borderWidth:2,
    marginBottom:10
  }
});

export default Header
