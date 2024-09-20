import { StyleSheet, Text, TextInput, View, Modal, Button, Alert } from 'react-native';
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
          onPress: onCancel(), // Correctly invoke onCancel to close the modal
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

        <View style={styles.buttonStyle}>
          <Button title="Confirm" onPress={handleConfirm} />
        </View>

        {/* Cancel button */}
        <View style={styles.buttonStyle}>
          <Button title="Cancel" onPress={handleCancel} />
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
  buttonStyle: {
    width: "30%",
    backgroundColor: "red",
    marginVertical: 5,
  },
});
