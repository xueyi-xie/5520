import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { writeToDB, getAllFromDB } from '../Firebase/firestoreHelper';


export default function GoalUsers({goalID}) {
    [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {

            const dataFromDB = getAllFromDB(`goals/${goalID}/users`);
            if (dataFromDB.length) {
                setUsers(
                    data.map((user) => {
                        return user.name;
                    })
                );
            return;
            }
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            const data = await response.json();
            data.forEach((user)=>{
                writeToDB(`goals/${goalID}/users`, user);
            });
            setUsers(
                data.map((user) => {
                    return user.name;
                })
            );

            } catch (e) {
                console.log("Error fetching data: ", e);
            };
        }
        fetchData();
    }, []); //one-time call

  return (
    <View>
      <FlatList 
        data={users}
        renderItem={({item}) => {return <Text>{item}</Text>;}}
      />
    </View>
  )
}

const styles = StyleSheet.create({})