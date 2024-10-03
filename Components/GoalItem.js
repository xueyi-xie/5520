import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalItem({goal, handleDelete, handlePress}) {
  return (
    <View key={goal.id} style={styles.buttonContainerStyle}>
      <Text>{goal.text}</Text>
      <Button 
        title="X" 
        onPress={()=>{
          handleDelete(goal.id);
          }} color="grey">
      </Button>
      <Button
      title="i"
      onPress={()=>{
        handlePress();
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    buttonContainerStyle:{
      flexDirection:"row",
      alignItems:"center",

    },
})