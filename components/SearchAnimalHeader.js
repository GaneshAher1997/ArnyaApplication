// Created By: Wasim Akram 
// Created at: 28/04/2023


import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";
import { LinearGradient,} from 'expo-linear-gradient';

const SearchAnimalHeader = ({
    label = "Conure",
    onPressFirst,
    onPressSecond,
}) => {
    return (
        <View style={styles.container}>
            <LinearGradient 
            colors={['#FFFFFF','#FFFFFF']}
            >
            <View style={styles.mainbox}>
                <View style={{ width: widthPercentageToDP(15), marginTop: heightPercentageToDP(4) }}>
                    <TouchableOpacity
                        style={{ width: widthPercentageToDP(15) }}
                        onPress={onPressFirst}
                    >
                        <Ionicons name="arrow-back-outline" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ width: widthPercentageToDP(60), marginRight: widthPercentageToDP(10), marginTop: heightPercentageToDP(4) }}>
                    <Text style={{ textAlign: "left", fontSize: 18, fontWeight: "500" }}>{label}</Text>
                </View>
                <View style={{ width: widthPercentageToDP(15), marginTop: heightPercentageToDP(4), }}>
                    <TouchableOpacity
                        style={{ width: widthPercentageToDP(15) }}
                        onPress={onPressSecond}
                    >
                        <Entypo name="cross" size={28} color="black" />
                    </TouchableOpacity>
                </View>

            </View>
            </LinearGradient>
        </View>
    )
}

export default SearchAnimalHeader;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
    mainbox: {
        marginLeft:widthPercentageToDP(4),
        flexDirection: "row",
        justifyContent: "space-between",
        height: heightPercentageToDP(12),
        width: widthPercentageToDP(100)
    }
})