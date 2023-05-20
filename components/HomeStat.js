import React from "react";
import { Card } from "react-native-paper";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import StatsBlock from "./StatsBlock";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NewAnimalAddedStats from "./NewAnimalAddedStats";

const HomeStat = ({ insightData, showStat }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, marginTop: hp(1) }}>
      {showStat ? (
        <View>
          <Card style={{ marginBottom: hp(2.5), backgroundColor: "#FFFFFF" }}>
            <Card.Title
              title="Zoo Insights Stat"
              subtitle="Last 1 Year data"
              titleStyle={{
                fontWeight: "400",
                fontSize: hp(2),
              }}
              subtitleStyle={{
                fontWeight: "200",
                fontSize: hp(1.5),
                marginTop: hp(-0.8),
              }}
              left={(props) => (
                <View
                  style={{
                    borderRadius: 25,
                    height: 40,
                    width: 45,
                    backgroundColor: "#FFBDA8",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../assets/insights.png")}
                    color="#FA6140"
                  />
                </View>
              )}
            />
            <Entypo
              name="dots-three-vertical"
              size={wp(5)}
              style={{
                color: "#717970",
                position: "absolute",
                right: wp(5),
                top: hp(3.5),
              }}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <StatsBlock
                insightData={insightData.zoo_stats.total_species}
                label={"Species"}
              />
              <StatsBlock
                insightData={insightData.zoo_stats.total_animals}
                label={"Animals"}
              />
              <StatsBlock
                insightData={insightData.zoo_stats.total_enclosures}
                label={"Enclosures"}
              />
            </View>

            <Card.Content>
              <View
                style={{
                  width: "100%",
                  height: 0,
                  borderTopWidth: 1,
                  borderColor: "#C3CEC7",
                }}
              ></View>

              <Text
                style={{
                  // color: isSwitchOn ? "white" : "black",
                  color: "#839D8D",
                  marginTop: wp(4),
                  marginLeft: wp(1),
                  fontSize: hp(1.6),
                  width: "100%",
                  height: 15,
                  fontWeight: "500",
                  lineHeight: 15,
                }}
              >
                More insights and animal statistics
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Collections");
                }}
                style={{
                  boxSizing: "borderBox",
                  display: "flex",
                  textAlign: "center",
                  position: "absolute",
                  right: 20,
                  top: 10,
                  width: 70,
                  borderColor: "#006D35",
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    boxSizing: "borderBox",
                    display: "flex",
                    textAlign: "center",
                    margin: 5,
                    color: "#006D35",
                    fontWeight: "500",
                    fontSize: 14,
                    lineHeight: 20,
                  }}
                >
                  View
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
          <NewAnimalAddedStats />
        </View>
      ) : null}
    </View>
  );
};

export default HomeStat;
