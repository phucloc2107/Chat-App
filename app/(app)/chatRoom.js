import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader'
import MessagesList from '../../components/MessagesList'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { Feather } from '@expo/vector-icons'
import CustomKeyboardView from '../../components/CustomKeyboardView'

const chatRoom = () => {
    const item = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([]);

    return (
    <CustomKeyboardView inChat={true}>
        <View style={styles.container}>
        <StatusBar style='dark' />
        <ChatRoomHeader user={item} router={router} />
        <View style={styles.headerBottomLine}></View>
        <View style={styles.message}>
            <View style={{flex:1}}>
                <MessagesList messages={messages} />
            </View>
            <View style={styles.messageFooter}>
                    <View style={styles.chatMessage}>
                        <TextInput 
                            placeholder='Type message...'
                            style={styles.chatTextInput}
                        />
                        <TouchableOpacity style={styles.chatButton}>
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