
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../configs/Colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AddMedicalRecordCard = ({
    UserEnclosureName,
    children,
    onPress,
    image,
    rightIcon,
    ...props
}) => {

    // console.log('THESE ARE TEH RECEIVED SEX DATA: ', tags);

    return (
        <TouchableWithoutFeedback onPress={onPress}>

            <View style={styles.cardContainer} backgroundColor={props.backgroundColor}>
             {image?<View style={styles.imagebox} backgroundColor={props.backgroundColor}>
                    <Image
                        style={styles.image}
                        source={props.imagePath}
                        resizeMode='stretch'
                    />
                </View>:
                    <Image
                        style={styles.imageTwo}
                        source={props.imgPath}
                        resizeMode="stretch"
                    />
                }
                
                <View style={styles.contentContainer}>
                    <View style={styles.middleSection}>
                        {children ?? null}

                    </View>
                    {rightIcon ?
                        <View>
                            <View
                                style={{
                                    marginHorizontal: wp(3),
                                    marginVertical: wp(4),
                                }}
                            >
                                <AntDesign name="right" size={wp(5)} color="black" />
                            </View>
                        </View> : null}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    enclosureName: {
        margin: '2%',
        paddingLeft: '3%',
        fontSize: 13,
    },
    cardContainer: {
        borderWidth: 0.5,
        borderColor: "#D9D9D9",
        backgroundColor: "#F2FFF8",
        borderRadius: wp("3%"),
        marginVertical: wp("2%"),

        elevation: 2, // for shadow on Android
        shadowColor: '#000', // for shadow on iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    contentContainer: {
        flexDirection: "row",
    },
    middleSection: {
        width: "80%",
        paddingLeft: wp(4),
        justifyContent: 'center',
        // backgroundColor: "red"
    },
    title: {
        fontSize: wp(4),
        fontWeight: '330',
        // marginBottom: 4,
        color: Colors.subtitle,
        // backgroundColor:'yellow',
        width: '100%'
    },
    subtitle: {
        fontSize: wp(14),
        color: Colors.subtitle,
        fontWeight: "400",
        fontStyle: "italic",
    },
    imagebox: {
        width: wp(11),
        height: hp(5),
        // backgroundColor: "#D9D9D9",
        marginTop: hp(1),
        padding: wp(1),
        alignItems: "center",
        // borderRadius: wp(5),
        // borderWidth:2
    },
    image: {
        height:hp(4),
        // width:"100%",
        // marginTop: hp(0.5),
        // borderRadius: wp(1)
    },
    imageTwo: {
        width: 44,
        height: 44,
        // borderRadius: 50,
        alignSelf: "center",
        marginRight: 10,
        marginLeft: 5,
    },
    rightSection: {
        justifyContent: "center",
        width: "35%",
        paddingRight: 30,
    },
    count: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "flex-end",
        color: Colors.count,
    },
});

export default AddMedicalRecordCard;