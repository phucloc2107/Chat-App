import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { Image } from 'expo-image';

const ChatRoomHeader = ({user, router}) => {
  return (
    <Stack.Screen 
        options={{
            title:'',
            headerShadowVisible: false,
            headerLeft: () => (
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Entypo name="chevron-left" size={hp(4)} color="#737373" />
                    </TouchableOpacity>
                    <View style={styles.userNameHeader}>
                        <Image 
                            source={user?.profileUrl}
                            style={styles.headerAvatar}
                        />
                        <Text style={styles.headerTextName}>
                            {user?.username}
                        </Text>
                    </View>
                </View>
            ),

            headerRight: () => (
                <View style={styles.headerRight}>
                    <Ionicons name='call' size={hp(2.8)} color="green" />
                    <Ionicons name='videocam' size={hp(2.8)} color="#737373" style={{marginLeft:15}}/>
                </View>
            )
        }}
    />
  )
}

export default ChatRoomHeader

const styles = StyleSheet.create({
    headerLeft:{
        flexDirection:'row',
        alignItems:'center',
        gap:4
    },
    userNameHeader:{
        flexDirection:'row',
        alignItems:'center',
        gap:3
    },
    headerAvatar:{
        height:hp(4.5),
        aspectRatio:1,
        borderRadius:100
    },
    headerTextName:{
        fontSize:hp(2.5),
        fontWeight:'600',
        color: '#404040'
    },
    headerRight:{
        flexDirection:'row',
        alignItems:'center',
        gap:8
    }
})