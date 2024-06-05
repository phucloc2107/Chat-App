import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const MessageItem = ({message, currentUser}) => {
  if (currentUser?.userId==message?.userId) {
    return (
      <View style={styles.userChat}>
        <View style={{width:wp(80)}}>
            <View style={styles.messageBox}>
                <Text style={{fontSize:hp(1.9)}}>
                    {message?.text}
                </Text>
            </View>
        </View>
      </View>
    )
  }else {
    return(
        <View style={styles.anotherUser}>
            <View style={styles.anotherUserMessageBox}>
                <Text style={{fontSize:hp(1.9)}}>
                    {message?.text}
                </Text>
            </View>
        </View>
    )
  }
}

export default MessageItem

const styles = StyleSheet.create({
    userChat:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom:12,
        marginRight:12
    },
    messageBox:{
        display:'flex',
        alignSelf:'flex-end',
        padding:12,
        borderRadius:16,
        backgroundColor:'white',
        borderWidth:1,
        borderColor: 'rgb(229 229 229)',
    },
    anotherUser:{
        width:wp(80),
        marginLeft:12,
        marginBottom:12
    },
    anotherUserMessageBox:{
        display:'flex',
        alignSelf:'flex-start',
        padding:8,
        paddingHorizontal:16,
        borderWidth:1,
        borderColor:'rgb(199 210 254)',
        backgroundColor:'rgb(224 231 255)',
        borderRadius:16
    }
})