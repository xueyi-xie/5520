import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalItem({goal}) {
  return (
    <View key={goal.id}>
      <Text>{goal.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})