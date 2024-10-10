import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PressableButton({children, pressFunction, componentStyle, pressedStyle}) {
  return (
    <Pressable 
    onPress={pressFunction}
    style={({pressed}) => [componentStyle, pressed && pressedStyle]}>
      <View>
        {children}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({})