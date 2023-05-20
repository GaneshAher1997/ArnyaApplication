// created By : Wasim Akram
// created At: 10/05/2023

// modified by Ganesh Aher
// Date:12 May 
// modified: 
//     1. right icon, 
//     2. design  Icon Image 


import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/CustomCard'
import MoveanimalFooter from '../../components/MoveanimalFooter'
import MoveAnimalHeader from '../../components/MoveAnimalHeader'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { event } from 'react-native-reanimated';


const InsightAnimalSelect = () => {
    const navigation = useNavigation();
    const data = [
        {
            id: "00001",
            name: "MkOO1",
            page: "SearchAnimDestination"
        },
        {
            id: "00002",
            name: "MkOO1"
        },
        {
            id: "00003",
            name: "MkOO1"
        },
        {
            id: "00004",
            name: "MkOO1"
        },
        {
            id: "00005",
            name: "MkOO1"
        },
        {
            id: "00006",
            name: "MkOO1"
        },
        {
            id: "00007",
            name: "MkOO1"
        },
        {
            id: "00008",
            name: "MkOO1"
        },
        {
            id: "00009",
            name: "MkOO1"
        },
        {
            id: "000010",
            name: "MkOO1"
        },

        {
            id: "000011",
            name: "MkOO1"
        },
        {
            id: "000012",
            name: "MkOO1"
        },
        {
            id: "000013",
            name: "MkOO1"
        },
        {
            id: "000014",
            name: "MkOO1"
        },
        {
            id: "000015",
            name: "MkOO1"
        },

    ]

    const CardPress = (item) => {
        console.log("THE Item GOT: ", item);
        navigation.navigate(item.page)

    };
    return (
        <>
            <MoveAnimalHeader title={"Mount Kailash"} />
            <View style={styles.container}>
                <View style={styles.listbox}>

                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Card
                                title={item.name}

                                subtitle={item.id}
                                rightIcon={<Ionicons name="chevron-forward" size={20} color="black" />}
                                style={styles.cardstyle}
                                onPress={(event) => CardPress(item, event)}
                                svgUri={true}

                            />

                        )}
                    />
                </View>
                <View style={styles.footerbox}>
                    <MoveanimalFooter />
                </View>

            </View>
        </>
    )
}

export default InsightAnimalSelect;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    footerbox: {
        position: "absolute",
        bottom: 0

    },
    listbox: {
        marginTop: heightPercentageToDP(4),
        width: widthPercentageToDP(90),
        marginBottom: heightPercentageToDP(15)

    },
    cardstyle: {
        backgroundColor: "#fff",
        borderRadius: widthPercentageToDP("2%"),
        marginVertical: widthPercentageToDP("2%"),
        // width:widthPercentageToDP(90),

        elevation: 2, // for shadow on Android
        shadowColor: "#000", // for shadow on iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10,
    }

})