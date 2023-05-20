import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Colors from '../configs/Colors';
import { capitalize } from '../utils/Utils'
import { widthPercentageToDP } from 'react-native-responsive-screen';
// import { white } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

const Card = ({ title, subtitle, extra, onPress,valueletter }) => {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.roundboxContainer}>
        <Text style={styles.numberText}>{valueletter}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.middleSection}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={title ? styles.subtitle : styles.title}>{subtitle}</Text> : null}
            {extra ?? null}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
     backgroundColor: '#fff',
        borderRadius: widthPercentageToDP("2%"),
        marginVertical: widthPercentageToDP("2%"),
    
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
  roundboxContainer:{
    width:44,
    height:44,
    borderRadius:50,
    alignSelf:"center",
    backgroundColor:"green",
    justifyContent:"center"
  },
  numberText:{
    textAlign:"center",
    fontSize:16,
    color:"white"
  },
  contentContainer: {
    flexDirection: 'row',
  },
  leftSection: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    justifyContent: 'center',
    width: "35%",
    paddingRight: 18,
  },
  count: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    color: Colors.count
  },
  middleSection: {
    width: "60%",
    paddingLeft: 10,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 19,
    color: Colors.subtitle,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.subtitle,
    marginBottom: 8,
    fontWeight: '400',
    fontStyle: 'italic',
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },

  malechip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#DAE7DF',
    marginHorizontal: 5,
    fontWeight: 500
  },
  femalechip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#DAE7DF',
    fontWeight: 500,
    marginLeft: 5
  },
  undeterminedChip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#FFD3D3',
    marginHorizontal: 5,
    fontWeight: 500
  },
  indeterminedChip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#F0F4FE',
    marginHorizontal: 5,
    fontWeight: 500
  },
  malechipText: {
    fontSize: 12,
    color: '#1F515B',
  },
  femalechipText: {
    fontSize: 12,
    color: '#1F515B',
  },
  undeterminedText: {
    fontSize: 12,
    color: '#1F515B',
  },
  indeterminedText: {
    fontSize: 12,
    color: '#1F515B',
  },
});

export default Card;
