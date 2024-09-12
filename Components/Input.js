import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

export default function Input() {
  const [text, setText] = useState("");
  function updateText(changedText){
    setText(changedText);
  }
  return (
    <View>
    <TextInput 
      placeholder='Type here' 
      keyboardType='default' 
      style={{borderBottomColor : "Purple"}} 
      value={text} 
      onChangeText={updateText}
      />
      </View>
  );
}

const styles = StyleSheet.create({});