import { StyleSheet, Text, TextInput, View, Modal, Button, Alert, Image } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

export default function Input({ shouldFocus, inputHandler, modalVisible, onCancel }) {
  const [text, setText] = useState("");
  const textInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(true);
  const [message, setMessage] = useState(""); // Message to show after blur

  function updateText(changedText) {
    setText(changedText);
  }

  function handleConfirm() {
    inputHandler(text);
    setText(""); // Clear the input after confirming
  }

  function handleCancel() {
    // Show an alert asking for confirmation to close the modal
    Alert.alert(
      "Cancel Input",
      "Are you sure you want to cancel?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel action aborted"), // Do nothing
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setText("");  // Clear the input after canceling
            onCancel();   // Close the modal
          },
        },
      ],
      { cancelable: true }
    );
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
    <Modal animationType="slide" visible={modalVisible}>
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Type here"
          keyboardType="default"
          value={text}
          onChangeText={updateText}
          ref={textInputRef}
          onFocus={() => setIsFocused(true)} // Counter shows when still focused
          onBlur={handleBlur}
        />
        {text.length > 0 && (
          <Text>Character count: {text.length}</Text> // Text below the input field that shows character count
        )}

        {!isFocused && message.length > 0 && (
          <Text style={styles.message}>{message}</Text> // Show message after input blurs
        )}

        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }} // Replace with your image URL
          style={styles.image}
          alt='a randmo picture'
        />
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }} // Replace with your image URL
          style={styles.image}
          alt="a random picture"
        />


        {/* Container for buttons with horizontal layout */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <Button 
              title="Confirm" 
              onPress={handleConfirm} 
              disabled={text.length < 3}  // Disable if fewer than 3 characters
            />
          </View>

          <View style={styles.buttonStyle}>
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcf",
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    color: "blue",
  },
  buttonContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-between',  // Spread the buttons apart
    width: '60%',  
  },
  buttonStyle: {
    flex: 1,  // 
    marginHorizontal: 5,  
    backgroundColor:"white",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10, // Add some spacing between images
  },
});
