import { Entypo } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { Text, View } from "react-native";
import { Card, Divider } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { shortenNumber } from '../utils/Utils';

const InsightsCard = ({ title, insightData, ...props }) => {

  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState('');

  const data = [
    {
      id: 1,
      name: "1W",
      isPreSelected: false,
    },
    {
      id: 2,
      name: "1M",
      isPreSelected: false,
    },
    {
      id: 3,
      name: "3M",
      isPreSelected: false,
    },
    {
      id: 4,
      name: "6M",
      isPreSelected: false,
    },
    {
      id: 5,
      name: "1Y",
      isPreSelected: false,
    },
    {
      id: 6,
      name: "5Y",
      isPreSelected: false,
    },
    {
      id: 7,
      name: "ALL",
      isPreSelected: true,
    },
    {
      id: 8,
      type: 'icon',
      icon: <Feather
        name="calendar"
        size={wp(5)}
        onPress={props.onPress}
        style={[
          {
            color: "#717970",
            left: wp('6%'),
          }
        ]}
      />,
      isPreSelected: false,
    },
  ];

  const Item = ({ item, onPress }) => {
    return (
      <View>
        {
          item.type === 'icon'
            ? <TouchableOpacity
                onPress={onPress}
              >
                { item.icon }
              </TouchableOpacity>
            : <TouchableOpacity
                onPress={onPress}
                style={[
                  styles.item,
                  {
                    backgroundColor: selectedId !== ''
                      ? item.id == selectedId ? "#37BD69" : null
                      : item.isPreSelected
                        ? "#37BD69"
                        : null,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.itemText,
                    {
                      color: selectedId !== ''
                        ? item.id == selectedId ? "#FFFFFF" : null
                        : item.isPreSelected
                          ? "#FFFFFF"
                          : null,
                    },
                  ]}
                >
                  {" "}{` ${item.name} `}{" "}
                </Text>
              </TouchableOpacity>
        }
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        style={[styles.itemContainer]}
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  return (
    <View
      style={[
        // styles.markNode,
        {
          backgroundColor: "#F2FFF8",
          borderRadius: wp(3),
        }
      ]}
    >
      <Card.Title
        style={[{ marginVertical: hp(1) }]}
        title={title}
        subtitle="Last Updateed Today 7:00 AM"
        titleStyle={{
          fontWeight: "400",
          fontSize: hp(2),
          color: "#000",
          left: wp(3),
        }}
        subtitleStyle={{
          fontWeight: "400",
          fontSize: 11.5,
          color: "#839D8D",
          left: wp(3),
          marginTop: hp(-0.5)
        }}
        left={(props) => (
          <View
            style={{
              borderRadius: wp(30),
              height: wp(12),
              width: hp(6),
              backgroundColor: "#FFBDA8",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={require("../assets/insights.png")} />
          </View>
        )}
      />

      <Entypo
        name="dots-three-vertical"
        size={wp(5)}
        style={{
          color: "#717970",
          alignSelf: "flex-end",
          top: hp(3.5),
          right: wp(5),
          position: "absolute",
        }}
      />

      <FlatList
        data={data}
        horizontal={true}
        renderItem={renderItem}
        extraData={selectedId}
        contentContainerStyle={{
          paddingHorizontal: wp("6%"),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />

      {/* <Feather
        name="calendar"
        size={wp(5)}
        color="#1F515B"
        onPress={props.onPress}
        style={[
          styles.markNode,
          {
            color: "#717970",
            alignSelf: "flex-end",
            // right: wp(8),
            // bottom: wp(7),
          }
        ]}
      /> */}

      {/* First Uline */}
      <View style={{ marginHorizontal: wp(6), marginVertical: wp(2) }}>
        <Divider bold={true} />
      </View>

      <Text
        style={{
          width: "90%",
          left: wp(5.2),
          fontWeight: "700",
          fontSize: hp(1.5),
          color: "#006D35",
        }}
      >
        {" "}
        4 Apr 2023 - 11 Apr 2023{" "}
      </Text>

      {/* last Uline */}

      <View style={{ marginHorizontal: wp(6), marginVertical: wp(2) }}>
        <Divider bold={true} />
      </View>
      {/* fifth div */}

      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          margin: wp(3),
        }}
      >
        {/* If text has +num% then give style= {styles.firstNumPostive} else style= {style.firstNum} */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.firstNumPostive} > +23%</Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: hp(6),
              lineHeight: hp(7),
              color: "#1F515B",
            }}
          >
            {shortenNumber(27)}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: hp(2),
              color: "#666666"
            }}
          >
            Species
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: hp(1.5),
              color: "#E93353",
            }}
          >
            -3%
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: hp(6),
              lineHeight: hp(7),
              color: "#1F515B",
            }}
          >
            {shortenNumber(133)}

          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: hp(2),
              color: "#666666"
            }}
          >
            Population
          </Text>
        </View>
      </View>

      {/* last div */}
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          marginTop: hp(1.5),
          alignItems: "center"
        }}
      >
        <View style={styles.parent}>
          <Text style={styles.firstNum}>-18%</Text>
          <Text style={styles.firstDiv}> {shortenNumber(props.middlelabel)}</Text>
          <Text style={styles.textStyle}>Accession</Text>
        </View>

        <View style={styles.parent}>
          <Text style={styles.firstNum}>-13%</Text>
          <Text style={styles.firstDiv}> {shortenNumber(props.middlabel)}</Text>
          <Text style={styles.textStyle}>Birth</Text>
        </View>

        <View style={styles.parent}>
          <Text style={styles.firstNumPostive}>+13%</Text>
          <Text style={styles.firstDiv}> {shortenNumber(props.lastlabel)} </Text>
          <Text style={styles.textStyle}>Mortality</Text>
        </View>
      </View>

      {/* Send the Props  */}

      {insightData != "birds" ? (
        <View style={styles.main}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.firstNum}>-3%</Text>
            <Text style={styles.firstDiv}>{shortenNumber(877)}</Text>
            <Text style={styles.textStyle}>Egg</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.firstNum}>-3%</Text>
            <Text style={styles.firstDiv}>{shortenNumber(425)}</Text>
            <Text style={styles.textStyle}>Incubation</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.firstNumPostive}>+13%</Text>
            <Text style={styles.firstDiv}> {shortenNumber(455)}</Text>
            <Text style={styles.textStyle}>Hand Raised</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default InsightsCard;

const styles = StyleSheet.create({
  itemText: {
    color: "#1F515B",
    fontSize: hp(1.6),
    fontWeight: "400",
  },
  item: {
    paddingHorizontal: wp(1),
    paddingVertical: hp(0.8),
    borderRadius: 5,
  },
  main: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: wp(4),
    marginBottom: wp(7),
    alignItems: "center",
  },
  parent: {
    alignItems: "center",
  },
  firstDiv: {
    fontWeight: "600",
    fontSize: hp(5),
    color: "#1F515B",
  },
  firstNum: {
    fontWeight: "600",
    fontSize: hp(1.5),
    color: "#E93353",
  },
  firstNumPostive: {
    fontWeight: "600",
    fontSize: hp(1.5),
    color: "#006D35",
  },
  textStyle: {
    fontWeight: "400",
    fontSize: hp(2),
    color: "#666666"
  },

  markNode: {
    borderColor: 'red',
    borderWidth: 1,
  },

});
