import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {Slot, useSegments,useRouter} from "expo-router";
import '../global.css';
import { AuthContextProvider, useAuth } from '../context/authContext';

const MainLayout = () =>{
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(()=>{
        //Check if user is authenticated or not 
        if(typeof isAuthenticated=='undefined') return;
        const inApp = segments[0]=='(app)';
        if( isAuthenticated && !inApp) {
            // redirect to home 
            router.replace('home');
        } else if(isAuthenticated==false){
            // redirect to signIn
            router.replace('signIn');
        }
    },[isAuthenticated])

    return <Slot />
}

export default function RootLayout() {
    return(
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})