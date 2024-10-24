import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
[user, setUser] = useState([]);

export default function GoalUsers() {

    useEffect(() => {
        async function fetchData() {
            try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            console.log(response.status);

            
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            
            const data = await response.json();
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
      <FlatList data={users}>
        renderItem={({item}) => <Text>{item.name}</Text>}
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({})