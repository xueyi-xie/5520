import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalItem({goal, handleDelete}) {
  return (
    <View key={goal.id} style={styles.buttonContainerStyle}>
      <Text>{goal.text}</Text>
      <Button title="X" onPress={()=>{
        handleDelete(goal.id);
        }} color="grey">
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonContainerStyle:{
      flexDirection:"row",
      alignItems:"center",

    },
})