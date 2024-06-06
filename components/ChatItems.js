import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { Image } from 'expo-image';
import {blurhash, formatDate, getRoomId} from '../utils/common';
import { Timestamp, collection, doc, setDoc, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const ChatItems = ({item,noBorder,router, currentUser}) => {

    const [lassMessage, setLastMessage] = useState(undefined);

    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef,'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc=>{
                return doc.data();
            });
            setLastMessage(allMessages[0]? allMessages[0]: null);
        });

        return unsub;
    },[]);
    //console.log('last Message: ', lassMessage)

  const openChatRoom = () => {
    router.push({pathname: '/chatRoom', params:item});
  }

  const renderTime = () =>{
    if (lassMessage) {
        let date = lassMessage?.createdAt;
        return formatDate(new Date(date?.seconds *1000))
    }
    return 'Time';
  }

  const renderLastMessage = () => {
    if(typeof lassMessage == 'undefined') return 'Loading...';
    if (lassMessage) {
        if(currentUser?.userId == lassMessage?.userId) return "You: " + lassMessage?.text
    }else {
        return 'Say Hi 👋';
    }
  }

  return (
    <TouchableOpacity style={[styles.buttonContainer, !noBorder && styles.borderBottom]} onPress={openChatRoom}>
        {/* <Image source={{uri: item?.profileUrl}} style={styles.image}/> */}
        <Image 
            source={item?.profileUrl}
            style={styles.image}
            placeholder={blurhash}
            transition={500}
        />

        {/* Name and last message */}
        <View style={{flex:1, gap:1}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.textName}>{item?.username}</Text>
                <Text style={styles.textTime}>{renderTime()}</Text>
            </View>

            <Text style={styles.textTime}>{renderLastMessage()}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ChatItems

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        gap:3,
        marginHorizontal:16,
        marginBottom:16,
        paddingBottom:8,
        // borderBottomColor: '#e5e5e5',
        // borderBottomWidth: 1,
    },
    borderBottom:{
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',  
    },
    image:{
        height:hp(6),
        width:hp(6),
        borderRadius:100
    },
    textName:{
        fontSize:hp(1.8),
        fontWeight: '600',
        color:'#1F2937'
    },
    textTime:{
        fontSize:hp(1.6),
        fontWeight: '500',
        color:'#6B7280'
    }
})