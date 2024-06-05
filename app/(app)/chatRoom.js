import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader'
import MessagesList from '../../components/MessagesList'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { Feather } from '@expo/vector-icons'
import CustomKeyboardView from '../../components/CustomKeyboardView'
import {useAuth} from '../../context/authContext';
import { getRoomId } from '../../utils/common'
import { Timestamp, collection, doc, setDoc, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const chatRoom = () => {
    const item = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const {user} = useAuth(); // logged in user
    const textRef = useRef('');
    const inputRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();

        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef,'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc=>{
                return doc.data();
            });
            setMessages([...allMessages])
        });

        return unsub;
    },[]);

    const createRoomIfNotExists = async() => {
        // roomID
        let roomId = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db,'rooms',roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    }

    const handleSendMessage = async() => {
        let message = textRef.current.trim();
        if(!message) return;
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef,'messages');
            textRef.current = '';
            if(inputRef) inputRef?.current?.clear();

            const newDoc = await addDoc(messagesRef,{
                userId: user?.userId,
                text:message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date()),
            });
            console.log('new message id: ', newDoc.id)
        } catch (err) {
            Alert.alert('Message', err.message);
        }
    }
    return (
    <CustomKeyboardView inChat={true}>
        <View style={styles.container}>
        <StatusBar style='dark' />
        <ChatRoomHeader user={item} router={router} />
        <View style={styles.headerBottomLine}></View>
        <View style={styles.message}>
            <View style={{flex:1}}>
                <MessagesList messages={messages} currentUser={user} />
            </View>
            <View style={styles.messageFooter}>
                    <View style={styles.chatMessage}>
                        <TextInput 
                            ref={inputRef}
                            onChangeText={value => textRef.current = value}
                            placeholder='Type message...'
                            style={styles.chatTextInput}
                        />
                        <TouchableOpacity style={styles.chatButton} onPress={handleSendMessage}>
                            <Feather name='send' size={hp(2.7)} color='#737373' />
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
        </View>
    </CustomKeyboardView>
  )
}

export default chatRoom

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    headerBottomLine:{
        color:'#d4d4d4',
        borderBottomWidth:0.5,
        height: 4
    },
    message:{
        flex:1,
        justifyContent:'space-between',
        overflow:'visible',
        backgroundColor:'#f1f5f9'
    },
    messageFooter:{
        marginBottom:hp(2.7),
        paddingTop:8
    },
    chatMessage:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        borderWidth:1,
        padding:8,
        borderColor:'##d4d4d4',
        borderRadius:100,
        marginHorizontal:12
    },
    chatTextInput:{
        fontSize:hp(2),
        flex:1,
        marginRight:8
    },
    chatButton:{
        backgroundColor:'rgb(229 229 229)',
        padding:8,
        borderRadius:100,
        marginRight:1
    }
})