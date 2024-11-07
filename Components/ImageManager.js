import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
    const [response, requestPermission] = ImagePicker.useCameraPermissions();
    async function verifyPermissions() {
        try {
        if (response.granted) {
            return true;
        }
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
    } catch (error) {
        console.log(error);
        return false
    }
}

    const takeImageHandler = async () => {
        try {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                Alert.alert("Permission needed");
                return;
            }
            const image = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });
            console.log(image);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <View>
      <Button 
      title = "take an image" 
      onPress={takeImageHandler}/>
    </View>
  )
}


const styles = StyleSheet.create({})