import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

export default function GoalDetails({navigation, route}) {
    console.log(route)
  return (
    <View>
      {route.params ? (<Text> Details: {route.params.goalObj.id} </Text>)
      : (<Text>More details</Text>)}
      <Button 
      title="more details"
      onPress={() => navigation.push('Details')}/>
    </View>
    

  )
}

const styles = StyleSheet.create({})