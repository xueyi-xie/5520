import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager({receiveImageUri}) {
    const [imgUri, setImgUri] = React.useState(null);
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
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });
            if (!result.canceled) {
                setImgUri(result.assets[0].uri);
                receiveImageUri(result.assets[0].uri);
                
            }
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


const styles = StyleSheet.create({
    image: { width: 100, height: 100 },
})