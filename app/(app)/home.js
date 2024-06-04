import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { StatusBar } from 'expo-status-bar';
import ChatList from '../../components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';

const home = () => {
  const [users, setUsers] = useState([]);
  const {logout, user} = useAuth();

  useEffect(() => {
    if (user?.uid)
      getUsers();
  },[])

  const getUsers = async() => {
     // Fetch users
     const q = query(usersRef, where('userId', '!=', user?.uid));
     
     const querySnapshot = await getDocs(q);
     let data = [];
     querySnapshot.forEach(doc => {
       data.push({...doc.data(  )});
      });
     setUsers(data);
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      {
        users.length > 0 ? (
          <ChatList users={users} />
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    </View>
  )
}

export default home;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  loading:{
    display:'flex',
    alignItems:'center',
    top: hp(30)
  }
})