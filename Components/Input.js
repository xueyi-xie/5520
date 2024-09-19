import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

export default function Input(inputHandler) {
  const [text, setText] = useState("");
  function updateText(changedText){
    setText(changedText);
  }
  function handleConfirm(){
    console.log(text)
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
      <Button
        title="Confirm"
        onPress={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({});