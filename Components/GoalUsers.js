import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function GoalUsers() {
    useEffect(() => {
        async function fetchData() {
            try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            console.log(response.status);
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            } catch (e) {
                console.log("Error fetching data: ", e);
            };
        }
        fetchData();
    }, []); //one-time call

  return (
    <View>
      <Text>GoalUsers</Text>
    </View>
  )
}

const styles = StyleSheet.create({})