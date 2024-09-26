import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalItem({goal}) {
  return (
    <View key={goal.id}>
      <Text>{goal.text}</Text>
      <Button></Button>
    </View>
  )
}

const styles = StyleSheet.create({})