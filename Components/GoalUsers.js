import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { writeToDB } from './Firebase/firestoreHelper';


export default function GoalUsers({goalID}) {
    [user, setUser] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {

            const dataFromDB = getAllFromDB(`goals/${goalID}/user`);
            if (dataFromDB.length) {
                setUser(
                    data.map((user) => {
                        return user.name;
                    })
                );
            return;
            }
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            console.log(response.status);

            
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            data.forEach((user)=>{
                writeToDB("user", `user${user.id}, user${user.name}`);
            })
            

            } catch (e) {
                console.log("Error fetching data: ", e);
            };
        }
        fetchData();
    }, []); //one-time call

  return (
    <View>
      <FlatList data={user}>
        renderItem={({item}) => <Text>{item}</Text>}
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({})