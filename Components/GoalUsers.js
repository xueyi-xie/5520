import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { writeToDB } from './Firebase/firestoreHelper';
[user, setUser] = useState([]);

export default function GoalUsers({goalID}) {

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
            console.log(response.status);

            
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            data.forEach((users)=>{
                writeToDB("users", `users${users.id}, users${users.name}`);
            })
            

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