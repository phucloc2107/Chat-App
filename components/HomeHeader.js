import {  Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import {blurhash} from '../utils/common';
import { useAuth } from '../context/authContext';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import CustomMenuItems from './CustomMenuItems';
import { AntDesign, Feather } from '@expo/vector-icons';

const android = Platform.OS=='android';

const HomeHeader = () => {
  const {user,logout} = useAuth();
  const {top} = useSafeAreaInsets();

  const handleProfile = () => {

  }

  const handleLogout = async() => {
    await logout();
  }

  return (
    <View style={[{paddingTop: android? top + 15 : top}, style=styles.container]}>
        <View>
            <Text style={styles.title}>HomeHeader</Text>
        </View>

        <View>
            <Menu>
                <MenuTrigger>
                    <Image 
                    style={styles.avatar}
                    source={user?.profileUrl}
                    placeholder={blurhash}
                    transition={500}
                    />
                </MenuTrigger>
                <MenuOptions 
                    customStyles={{optionsContainer:{
                        borderRadius:10,
                        borderCurve:'continuous',
                        marginTop:40,
                        marginLeft:-30,
                        backgroundColor:'white',
                        shadowOpacity:0.2,
                        shadowOffset:{width:0,height:0},
                        width:160
                    }}}
                >
                    <CustomMenuItems 
                        text='Profile'
                        action={handleProfile}
                        value={null}
                        icon={<Feather name='user' size={hp(2.5)} color='#737373' />}
                    />
                    <Divider />
                    <CustomMenuItems 
                        text='Sign out'
                        action={handleLogout}
                        value={null}
                        icon={<AntDesign name='logout' size={hp(2.5)} color='#737373' />}
                    />
                </MenuOptions>
            </Menu>
        </View>
    </View>
  )
}

const Divider = () => {
    return(
        <View style={styles.nemuLine} />
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 20, // Equivalent to px-5
        backgroundColor: '#7f9cf5',
        paddingBottom: 24, 
        borderBottomLeftRadius: 24, 
        borderBottomRightRadius: 24,
        // shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 8, 
    },
    title:{
        fontSize:hp(3),
        fontWeight:'500',
        color:'#FFFFFF'
    },
    avatar:{
        height:hp(4.3),
        aspectRatio:1,
        borderRadius:100
    },
    nemuLine:{
        width: '100%',      
        backgroundColor: '#e5e5e5', 
        padding: 1,   
    }
})