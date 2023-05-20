import { View, StyleSheet, Text, Image } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { Avatar } from "react-native-paper";

const NewAnimalAddedStats = (props) => {
  return (
    <View style={styles.container}>
      <Card
        style={[
          props.style,
          { width: "100%", height: 90, backgroundColor: "#FFFFFF" },
        ]}
      >
        <View style={styles.cardContainer}>
          <View style={styles.AvtarImage}>
            <Avatar.Image size={54} source={require("../assets/parrot.jpeg")} />
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontWeight: "500", fontSize: 18, color: "#1F515B" }}>
              New Lemur added
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 12,
                color: "#839D8D",
                top: 5,
              }}
            >
              5 mins ago
            </Text>
          </View>
          <View>
            <Image
              style={styles.imageStyle}
              source={require("../assets/media.png")}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  AvtarImage: {
    alignItems: "center",
    justifyContent: "center",
    left: "15%",
  },
  imageStyle: {
    height: "100%",
    width: 100,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default NewAnimalAddedStats;
