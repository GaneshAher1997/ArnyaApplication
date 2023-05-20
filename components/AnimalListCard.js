// Name: Ganesh Aher
// Date:24 April
// work: Design FlatListCard component

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../configs/Colors";
import { capitalize } from "../utils/Utils";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

const AnimalListCard = ({
  UserEnclosureName,

  title,
  subtitle,
  onPress,
  checkbox,
  borderWidth,
  backgroundColo,
  subfont,
  color,
  subweight,
  encColor,
  encWeight,
  tags,
  ...props
}) => {
  // console.log('THESE ARE TEH RECEIVED SEX DATA: ', tags);

  return (
 

    
    <TouchableWithoutFeedback  onPress={onPress}>
  
      <View style={[styles.cardContainer,{borderWidth:borderWidth}]}>
      {/* backgroundColor:backgroundColo */}
    
        <Image
          style={styles.image}
          source={require("../assets/parrot.jpeg")} // Pass the image source as a prop
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          <View style={styles.middleSection}>
            {
              props.titleName ?
              <View> 
              <Text style={styles.titleName}>{props.titleName} </Text>
              </View>
              : null
            }
            {title ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.title}>{title}</Text>
                {/* {chips} */}
              </View>
            ) : null}
   <View style={{ flexDirection: 'row', width: widthPercentageToDP(40) }}>
            {subtitle ? 
              <Text style={[title ? styles.subtitle : styles.title ,{fontSize:subfont} ,{fontWeight:subweight}]}>
                {subtitle}
              </Text>
             : null}


{
              tags== "typesTag" ?

                <View style={styles.mainTag}>
                  <View style={styles.tagscontainerM}>
                    <Text style={{
                      color: '#1F515B',
                      fontWeight: '500',
                      fontSize: 10,
                      lineHeight: 12,
                      textAlign: 'center'
                    }}>M</Text>
                  </View>

                  <View style={styles.tagscontainerB}>
                    <Text style={{
                      color: '#1F515B',
                      fontWeight: '500',
                      fontSize: 10,
                      lineHeight: 12,
                      textAlign: 'center'
                    }}>B</Text>
                  </View>

                </View>

                : null
            }



          </View>
          
          </View>

          <View style={styles.enc}>
            <Text style={[styles.encName,{color:encColor},{fontWeight:encWeight}]}>{UserEnclosureName}</Text>
          </View>

        {
          props.sectionName ? 
            
          <View style={styles.section}>
            <Text style={styles.secName}>{props.sectionName}</Text>
          </View>

          : null
        }
          
        </View>
        <View style={styles.rightSection}>
          <View
            style={{
              marginHorizontal: widthPercentageToDP(6),
              marginVertical: widthPercentageToDP(6.5),
            }}
          >
            <AntDesign name="right" size={17}  color="black" />
          </View>
        </View>
         
      </View>

    </TouchableWithoutFeedback>

  
  );
};

const styles = StyleSheet.create({
titleName:{
  margin: "0.5%",
  fontSize: 13.5,
  color: '#44544A',
},
  encName: {
    margin: "2%",
    paddingLeft: "3%",
    fontSize: 13.5,
  },
  secName:{
    margin: "2%",
    paddingLeft: "3%",
    fontSize: 13.5,
    color: '#44544A',
    fontWeight: "500",
    width: "100%",

  },
  cardContainer: {
    // backgroundColor: "#fff",
    borderRadius: widthPercentageToDP("2%"),
    marginVertical: widthPercentageToDP("2%"),

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
    paddingVertical: 8,
    
    backgroundColor:'#F2FFF8',
 

 
  },

  contentContainer: {
    // flexDirection: 'row',
    // backgroundColor:'red'
  },
  rightSection: {
    justifyContent: "center",
    width: "35%",
    paddingRight: 30,
    
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 50,
    alignSelf: "center",
    marginRight: 10,
    marginLeft: 5,
  
  },


  middleSection: {
    width: "70%",
    paddingLeft: 10,
    justifyContent: "center",
  
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.subtitle,
    // backgroundColor:'red',
    width: widthPercentageToDP("55%"),
  },
  subtitle: {
    fontSize: 13,
    color: '#44544A',
    fontWeight: "400",
    // width: "100%",
    width: widthPercentageToDP("25%"),
    // backgroundColor:'yellow'
   
  },
  mainTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP(18),
    height: heightPercentageToDP(3.5),
    // backgroundColor:'red'

  },
  tagscontainerM: {

    width: widthPercentageToDP(6.5),
    height: heightPercentageToDP(3.2),
    backgroundColor: '#DAE7DF',
    borderRadius: 6,

    marginLeft:widthPercentageToDP(1.2),
    justifyContent: 'center'
  },
  tagscontainerB: {

    width: widthPercentageToDP(6.5),
    height: heightPercentageToDP(3.2),
    backgroundColor: '#00D6C9',
    borderRadius: 6,

    justifyContent: 'center'
  },

  // tag: {
  //     backgroundColor: '#f0f0f0',
  //     borderRadius: 8,
  //     paddingVertical: 4,
  //     paddingHorizontal: 8,
  //     marginRight: 8,
  // },
});

export default AnimalListCard;