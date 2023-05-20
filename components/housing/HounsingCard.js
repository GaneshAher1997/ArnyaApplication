// Created By: Mohit sharma
// created at: 08/05/2023

import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Card, Chip } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Colors from "../../configs/Colors";
import { SvgUri } from "react-native-svg";

const HounsingCard = (props) => {
  return (
    <>
      <Card
        style={[
          props.style,
          {
            backgroundColor: Colors.white,
            marginVertical: 10,
            marginHorizontal: 12,
          },
        ]}
        onPress={props.onPress}
      >
        <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
          <View style={styles.image}>
            <SvgUri
              width="100%"
              height="100%"
              uri={"https://app.antzsystems.com/assets/class_images/default_animal.svg"}
            />
          </View>
          <View style={{ margin: widthPercentageToDP(3) }}>
            <Text
              style={{
                color: "rgba(68, 84, 74, 1)",
                fontSize: 17,
                fontWeight: "600",
                margin: 2,
              }}
            >
              {props.title}
            </Text>
            <Text style={{ color: "rgba(68, 84, 74, 1)", margin: 2 }}>
              In Charge - {}
              <Text
                style={{
                  color: "rgba(0, 109, 53, 1)",
                  fontSize: 14,
                  fontWeight: "400",
                  margin: 2,
                }}
              >
                {props.incharge}
              </Text>
            </Text>
            {props.section ? (
              <Text style={{ color: "rgba(68, 84, 74, 1)", margin: 2 }}>
                Section - {}
                <Text style={{}}>{props.section}</Text>
              </Text>
            ) : null}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: widthPercentageToDP(2),
                marginBottom: widthPercentageToDP(1.5),
              }}
            >
              <Chip style={{ backgroundColor: "#EFF5F2" }}>{props.chip1}</Chip>
              <Chip style={{ marginLeft: "2%", backgroundColor: "#EFF5F2" }}>
                {props.chip2}
              </Chip>
            </View>
          </View>
        </View>
      </Card>
    </>
  );
};

export default HounsingCard;

const styles = StyleSheet.create({

  image: {
    width: 44,
    height: 44,
    borderRadius: 50,
    alignSelf: "center",
    marginRight: 10,
    marginLeft: 5,
  },

 
  
});