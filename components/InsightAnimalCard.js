import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SvgUri from 'react-native-svg-uri';
import Configs from "../configs/Config";
import { shortenNumber } from "../utils/Utils";

const InsightAnimalCard = ({ ...props }) => {
  const navigation = useNavigation();

  if (!props.showClassHierchy) {
    return null;
  }

  return (
    <View style={styles.main}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onPress}
      >
        {/* <Image
          source={require('../assets/Birds.png')}
          style={styles.img}
        /> */}
        <SvgUri
          width="80"
          height="80"
          // style={styles.img}
          source={{uri:Configs.BASE_APP_URL + props.classData.default_icon}}
        />

        <Text style={styles.firstNum}>{shortenNumber(props?.classData?.animal_count ?? 0)}</Text>
        <Text style={styles.textStyle}>{props.classData.complete_name}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default InsightAnimalCard


const styles = StyleSheet.create({

  main: {
    margin: wp(0.97),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    padding: 7,
    backgroundColor: '#fff',
    margin: wp(0.97),
    marginTop: wp(3),
    borderRadius: wp(3),
    height: hp(18),
    width: wp(29)
  },

  firstDiv: {
    fontWeight: '600',
    fontSize: 36,
    lineHeight: 44,
    color: '#1F515B',
    textAlign: 'center',
  },
  firstNum: {
    marginTop: 5,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 20,
    color: '#666666',
    // left: 7,
    textAlign: 'center'
  },
  textStyle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    color: '#666666',
    textAlign: 'center',
  },


});

