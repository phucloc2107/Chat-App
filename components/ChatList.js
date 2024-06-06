import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatItems from './ChatItems'
import {  useRouter } from 'expo-router'

const ChatList = ({users, currentUser}) => {
  const router = useRouter();
  return (
    <View style={styles.container}> 
      <FlatList 
        data={users}
        contentContainerStyle={{flex:1,paddingVertical:25}}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({item,index}) => <ChatItems 
          noBorder = {index + 1 == users.length}
          router = {router}
          currentUser={currentUser}
          item={item}  
          index={index}
        />}
      />
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})