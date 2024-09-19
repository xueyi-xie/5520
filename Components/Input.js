import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useRef, useEffect} from 'react'

  
export default function Input({shouldFocus, inputHandler}) {
 
  const [text, setText] = useState("");
  const textInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(true);
  const [message, setMessage] = useState(""); // Message to show after blur

  
  function updateText(changedText){
    setText(changedText);
  }
  function handleConfirm(){
    inputHandler(text);
    }
  useEffect(() => {
    if (shouldFocus && textInputRef.current) {
      textInputRef.current.focus(); // Focus the input programmatically
    }
  }, [shouldFocus]); 



  function handleBlur() {
    setIsFocused(false); // Set focus state to false
    // Set message based on the text length
    if (text.length >= 3) {
      setMessage("Thank you");
    } else {
      setMessage("Please type more than 3 characters");
    }
  }

  return (
    <View>
      <TextInput 
        placeholder='Type here' 
        keyboardType='default' 
        style={{borderBottomColor : "Purple"}} 
        value={text} 
        onChangeText={updateText}
        ref={textInputRef} 
        onFocus={() => setIsFocused(true)} //counter shows when stil focused
        onBlur={handleBlur} 
        />
        {text.length > 0 && (
        <Text>Character count: {text.length}</Text> //Text below the input field that shows character count
      )}
      
      {!isFocused && message.length > 0 && (
        <Text style={styles.message}>{message}</Text> //show message after input blurs
      )} 
     
      <Button
        title="Confirm"
        onPress={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({});