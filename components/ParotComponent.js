
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native'


const ParotComponent = (props) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPress} style={styles.container}>
      <Card style={[props.style, { backgroundColor: "white", }]}>
        <Card.Title
          title={props?.title ? `${props?.title ?? ''}${"\n"}${props?.subtitle ?? ''}` : `${props?.subtitle ?? ''}`}
          subtitle={props.extra}
          left={props.LeftContent}
          right={props.RightContent}
          style={{ borderRadius: 10 }}
        />
       
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});
export default ParotComponent;


//Example =>You can import like this and use in Your component

{/* <ParotComponent title="Conures" subtitle="mohit" RightContent ={()=><Text>20</Text>} LeftContent={()=> <Avatar.Image size={54}/>}/> */ }
