import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function GoalItem({goal, handleDelete }) {
  const navigation = useNavigation();
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
      onPress={() => {
        navigation.navigate('Details', { goalObj: goal });
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