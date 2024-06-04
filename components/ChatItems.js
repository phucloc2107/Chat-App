import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { Image } from 'expo-image';
import {blurhash} from '../utils/common';

const ChatItems = ({item,noBorder,router}) => {

  const openChatRoom = () => {
    router.push({pathname: '/chatRoom', params:item});
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
                <Text style={styles.textTime}>Time</Text>
            </View>

            <Text style={styles.textTime}>Last Message</Text>
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