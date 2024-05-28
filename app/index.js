import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={styles.container} >
      <Text style={styles.text}>Home</Text>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
container:{
    backgroundColor:'#FFC0CB',
    paddingTop:20,
},
text:{
    fontSize:24,
    textAlign:'center'
}
})