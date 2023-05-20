// created By: Wasim Akram
// created At: 10/05/2023


import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { LinearGradient } from "expo-linear-gradient";

const MoveanimalFooter = ({

}) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#E8F4ED", "#E8F4ED"]}>
      <View style={styles.mainBox}>
       <View style={styles.firstbutton}>
        <TouchableOpacity style={styles.firstbutton}>
            <Text style={{color:"#fff"}}>Cancel</Text>
        </TouchableOpacity>
       </View>
       <View style={styles.secondbutton}>
      <TouchableOpacity
      style={styles.secondbutton}
      >
       <Text style={{color:"#fff"}}>Move it here</Text>
      </TouchableOpacity>
       </View>
      </View>
      </LinearGradient>
    </View>
  )
}

export default MoveanimalFooter;
const styles = StyleSheet.create({
    container:{
        flex:1,
        position:"relative",
        // borderWidth:1
    },
    mainBox:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#ffff",
        height:heightPercentageToDP(12),
        width:widthPercentageToDP(100),
        
    },
    // modifed by ganesh Aher 
    // date: 12 May 
    // work : 1.firstbutton
    
    firstbutton:{
        height:heightPercentageToDP(5),
        width:widthPercentageToDP(20),
        backgroundColor:"#839D8D",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:8,
        // marginRight:widthPercentageToDP(2)
        marginHorizontal:widthPercentageToDP(2)
    },
    secondbutton:{
        height:heightPercentageToDP(5),
        width:widthPercentageToDP(30),
        backgroundColor:"#00B386",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:8,
        
        
    }
})