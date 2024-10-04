import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'

export default function Warning({navigation, route}) {
    console.log(route)
  return (
    navigation.setOptions({ title: "Warning" }),
    <View>
    {route.params ? (<Text style={{color: 'red'}}> Details: {route.params.goalObj.id} </Text>)
      : (<Text style={{color: 'red'}}>More details</Text>)}
    </View>
  )
}

const styles = StyleSheet.create({})