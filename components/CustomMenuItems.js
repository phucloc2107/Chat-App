import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { MenuOption } from 'react-native-popup-menu';

const CustomMenuItems = ({text,action,value,icon}) => {
  return (
    <MenuOption onSelect={()=>action(value)}>
        <View style={styles.container}>
            <Text style={styles.textName}>
                {text}
            </Text>
            {icon}
        </View>
    </MenuOption>
  )
}

export default CustomMenuItems

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:16,
        paddingVertical:4
    },
    textName:{
        fontSize:hp(1.7),
        fontWeight:'600',
        color:'#525252'
    }
})