{
  /*Author: Ashutosh Raj
   Date: 4-05-023
*/
}

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ImageHeader from "../../../components/ImageHeader";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { capitalize } from "../../../utils/Utils";
import { Avatar, Card, Chip } from "react-native-paper";
import Colors from "../../../configs/Colors";
import CustomCard from "../../../components/CustomCard";
import {
  getEnclosureBySectionId,
  getSectionDetails,
  getSpeciesListingBySections,
} from "../../../services/GetEnclosureBySectionIdServices";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";

const OverlayContent = ({ sectionDetailsData, section_name }) => {
  return (
    <>
      <View
        style={{
          justifyContent: "space-between",
          backgroundColor: "#00000999",
          height: heightPercentageToDP(60),
        }}
      >
        <ImageHeader title={sectionDetailsData?.section_name ?? section_name} />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: widthPercentageToDP(3),
            paddingRight: widthPercentageToDP(3),
            height: heightPercentageToDP(34),
            bottom: heightPercentageToDP(17),
          }}
        >
          <View style={{}}>
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "600",
                fontSize: 25,
              }}
            >
              {sectionDetailsData.section_name ?? section_name}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                In Charge
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderWidth: 1,
                  marginLeft: heightPercentageToDP(1),
                  marginRight: heightPercentageToDP(1),
                  borderColor: "rgba(131, 157, 141, 1)",
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    marginLeft: widthPercentageToDP(1),
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={styles.bgImage2}
                    source={require("../../../assets/person.png")}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    marginLeft: heightPercentageToDP(1),
                    marginRight: heightPercentageToDP(1),
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "400",
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    {sectionDetailsData.section_incharge ?? "Churchil"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "rgba(131, 157, 141, 1)",
                  padding: heightPercentageToDP(1),
                  borderRadius: 5,
                }}
              >
                <Image source={require("../../../assets/call.png")} />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "rgba(131, 157, 141, 1)",
                  marginLeft: widthPercentageToDP(1),
                  padding: heightPercentageToDP(1),
                  borderRadius: 5,
                }}
              >
                <Image source={require("../../../assets/chat.png")} />
              </View>
            </View>
          </View>
          <View>
            <View>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: 17,
                  marginBottom: heightPercentageToDP(1),
                }}
              >
                Site - {sectionDetailsData.site_name ?? "Paradise"}
              </Text>
            </View>
          </View>
          <View style={{ backgroundColor: "transparent" }}>
            <View style={styles.cardContainer1}>
              <View
                style={{ flexDirection: "row", backgroundColor: "transparent" }}
              >
                <Text style={styles.cardTitle}>All Time Data</Text>

                <Entypo
                  name="chevron-small-down"
                  size={24}
                  color="rgba(82, 249, 144, 1)"
                  style={{ marginTop: 15, right: 10 }}
                />
              </View>
              <View style={styles.dataContainer1}>
                <View style={styles.dataRow}>
                  <Text style={styles.cardNumber}>
                    {sectionDetailsData.total_enclosures ?? 112}
                  </Text>
                  <Text style={styles.cardNumberTitle}>Enclosures</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.cardNumber}>
                    {sectionDetailsData.total_animals ?? 324}
                  </Text>
                  <Text style={styles.cardNumberTitle}>Animals</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.cardNumber}>
                    {sectionDetailsData.total_species ?? 45}
                  </Text>
                  <Text style={styles.cardNumberTitle}>Species</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              margin: widthPercentageToDP(1.5),
            }}
          >
            <Chip
              style={{
                backgroundColor: "rgba(255, 211, 211, 1)",
                borderRadius: 5,
                marginRight: widthPercentageToDP(1),
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "rgba(233, 51, 83, 1)",
                }}
              >
                3 open task
              </Text>
            </Chip>
            <Chip
              style={{
                backgroundColor: "rgba(0, 214, 201, 1)",
                borderRadius: 5,
                marginRight: widthPercentageToDP(1),
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "rgba(31, 65, 91, 1)",
                }}
              >
                Sunroof
              </Text>
            </Chip>
            <Chip
              style={{
                backgroundColor: "rgba(0, 214, 201, 1)",
                borderRadius: 5,
                marginRight: widthPercentageToDP(1),
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "rgba(31, 65, 91, 1)",
                }}
              >
                Cam
              </Text>
            </Chip>
          </View>
        </View>
      </View>
    </>
  );
};

export const Body = ({
  enclosureData,
  navigation,
  speciesListData,
  section_name,
}) => {
  const TAB_HEADER_ITEMS = [
    {
      id: "1",
      title: "Enclosures",
      screen: "enclosure",
    },
    {
      id: "2",
      title: "Animals",
      screen: "animal",
    },
    {
      id: "3",
      title: "History",
      screen: "history",
    },
  ];

  const [screen, setScreen] = useState("enclosure");

  const Item = ({ title, screenName }) => (
    <TouchableOpacity
      style={[
        styles.tabHeaderItemWrapper,
        screenName === screen
          ? { borderBottomColor: "#39ab6b", borderBottomWidth: 2 }
          : {},
      ]}
      onPress={() => setScreen(screenName)}
    >
      <Text
        style={[
          styles.tabHeaderItem,
          screenName === screen ? { color: "#39ab6b" } : {},
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.bodyContainer}>
        <View style={styles.tabHeaderWrapper}>
          <FlatList
            style={styles.tabHeader}
            data={TAB_HEADER_ITEMS}
            renderItem={({ item }) => (
              <Item title={item.title} screenName={item.screen} />
            )}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.tabBody}>
          {screen === "enclosure" ? (
            <Enclosure enclosureData={enclosureData} navigation={navigation} />
          ) : screen === "history" ? (
            <History />
          ) : screen === "animal" ? (
            <Animal speciesListData={speciesListData} />
          ) : null}
        </View>
      </View>
    </>
  );
};

const Enclosure = ({ enclosureData, navigation }) => {
  return (
    <>
      <View style={{ marginHorizontal: 14 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={enclosureData}
          renderItem={({ item }) => {
            return (
              <CustomCard
                title={capitalize(item.user_enclosure_name)}
                // svgUri={item.image}
                icon={item.image}
                count={item.enclosure_wise_animal_count}
                onPress={() =>
                  navigation.navigate("OccupantScreen", {
                    enclosure_id: item?.enclosure_id ?? 0,
                  })
                }
              />
            );
          }}
        />
      </View>
    </>
  );
};

const Animal = ({ speciesListData }) => {
  return (
    <>
      <View style={{ marginHorizontal: 14 }}>
        <FlatList
          data={speciesListData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CustomCard
              title={capitalize(item.common_name)}
              subtitle={capitalize(item.complete_name)}
              icon={item.default_icon}
              count={item.animal_count}
              tags={item.sex_data}
            />
          )}
        />
      </View>
    </>
  );
};

const History = () => {
  return <></>;
};

function HousingEnclouser() {
  const [enclosureData, setEnclosureData] = useState([]);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const [sectionDetailsData, setSectionDetailsData] = useState([]);
  const [speciesListData, setSpeciesListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Maximum_Height = heightPercentageToDP(30);
  //Max Height of the Header
  const Header_Minimum_Height = heightPercentageToDP(10);
  //Min Height of the Header
  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height],
    outputRange: [Header_Maximum_Height, heightPercentageToDP(5.5)],
    extrapolate: "clamp",
  });

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height],
    outputRange: ["#4286F4", "#fff"],
    extrapolate: "clamp",
  });
  const route = useRoute();
  const section_name = route.params.section_title;

  const navigation = useNavigation();

  // API implementation for Enclosure
  useEffect(() => {
    setIsLoading(true);
    let requestObj = {
      section_id: route.params.section_id,
    };
    getEnclosureBySectionId(requestObj)
      .then((res) => {
        // console.log("THIS IS RESPONSE BY ENCLOSURE ID---------", res.data);
        setEnclosureData(res.data.enclosure_list);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // API implementation for Section Detatils
  useEffect(() => {
    let requestObj = {
      zoo_id: zooID,
      section_id: route.params.section_id,
    };
    setIsLoading(true);
    getSectionDetails(requestObj)
      .then((res) => {
        console.log("THIS IS SECTION DETAILS======", res.data);
        setSectionDetailsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // API implementation for Get Species Listing By Sections
  useEffect(() => {
    let requestObj = {
      zoo_id: zooID,
      section_id: route.params.section_id,
    };
    setIsLoading(true);
    getSpeciesListingBySections(requestObj)
      .then((res) => {
        setSpeciesListData(res.data.classification_list);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Loader visible={isLoading} />
      <SafeAreaView style={styles.container}>
        <View style={{}}>
          <Animated.View
            style={[
              styles.header,
              {
                height: animateHeaderHeight,
                backgroundColor: animateHeaderBackgroundColor,
              },
            ]}
          >
            <View style={styles.headerContainer}>
              <ImageBackground
                style={styles.bgImage}
                source={require("../../../assets/image.png")}
              >
                <View>
                  <OverlayContent
                    sectionDetailsData={sectionDetailsData}
                    section_name={section_name}
                  />
                </View>
              </ImageBackground>
            </View>
          </Animated.View>
        </View>
        <Body
          style={styles.bodyContainer}
          enclosureData={enclosureData}
          navigation={navigation}
          speciesListData={speciesListData}
          isLoading={isLoading}
        />
      </SafeAreaView>
    </>
  );
}

export default HousingEnclouser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: heightPercentageToDP(100),
  },
  headerContainer: {
    width: "100%",
  },
  bgImage: {
    height: heightPercentageToDP(60),
    width: widthPercentageToDP(100),
    borderWidth: 1,
  },
  bgImage2: {
    color: "rgba(255, 255, 255, 1)",
  },
  cardContainer1: {
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: Colors.housingcard,
    borderRadius: 10,
  },
  dataContainer1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 10,
  },
  dataRow: {
    alignItems: "center",
  },
  cardTitle: {
    color: Colors.housingcardTitle,
    fontWeight: "600",
    fontSize: 15,
    margin: 15,
  },
  cardNumber: {
    fontSize: 36,
    fontWeight: "600",
    color: Colors.housingcardTitle,
  },
  cardNumberTitle: {
    color: Colors.housingcardTitle,
    fontSize: 15,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 50,
    alignSelf: "center",
    marginRight: 10,
    marginLeft: 5,
  },

  RestLessness: {
    borderWidth: 0.5,
    padding: widthPercentageToDP(1),
    paddingTop: widthPercentageToDP(0.5),
    height: heightPercentageToDP(3.8),
    marginLeft: widthPercentageToDP(1),
    borderRadius: 2,
    borderColor: "grey",
    fontSize: 15,
    fontWeight: "600",
    backgroundColor: "rgba(0, 214, 201, 1)",
    color: "rgba(31, 65, 91, 1)",
    borderRadius: 5,
  },
  bodyContainer: {
    position: "relative",

    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: heightPercentageToDP(2.8),

    height: heightPercentageToDP(48),
    top: heightPercentageToDP(17),
  },

  tabHeaderWrapper: {
    height: heightPercentageToDP(5),
  },

  tabHeader: {},

  tabHeaderItemWrapper: {
    marginHorizontal: heightPercentageToDP(4),
  },

  tabHeaderItem: {
    padding: 4,
    color: Colors.tabHeadercolor,
    fontSize: 14,
    fontWeight: "500",
    fontSize: 15,
  },

  tabBody: {
    height: heightPercentageToDP(45),
    backgroundColor: "rgba(221, 229, 218, 1)",
  },
});
