import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useRef, useEffect} from 'react'

export default function Input({shouldFocus}) {
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(true);
  const textInputRef = useRef(null);
  
  function updateText(changedText){
    setText(changedText);
  }
  /*function updateFocus(){
    setFocus(true);
  }*/
  useEffect(() => {
    if (shouldFocus && textInputRef.current) {
      textInputRef.current.focus(); // Focus the input programmatically
    }
  }, [shouldFocus]); 

  return (
    <View>
      <TextInput 
        placeholder='Type here' 
        keyboardType='default' 
        style={{borderBottomColor : "Purple"}} 
        value={text} 
        onChangeText={updateText} 
        ref={textInputRef} 
        />
      </View>
  );
}

const styles = StyleSheet.create({});