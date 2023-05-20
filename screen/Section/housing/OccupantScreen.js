// Created By: Wasim Akram
// Created At: 03/05/2023
// modified by Wasim Akram at 04/05/2023

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import ImageHeader from "../../../components/ImageHeader";

import { useNavigation, useRoute } from "@react-navigation/native";
import { capitalize } from "../../../utils/Utils";
import { Card, Checkbox, Chip } from "react-native-paper";
import moment from "moment/moment";
import Colors from "../../../configs/Colors";
import CustomCard from "../../../components/CustomCard";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { getAnimalListBySections } from "../../../services/GetEnclosureBySectionIdServices";
import Loader from "../../../components/Loader";
import { useEffect } from "react";

{
  /* Author- Ashutosh Raj
    Date - 08-05-023
    Des - API implementation 
*/
}
const OverlayContent = ({ basicInfoData }) => {
  return (
    <>
      <View
        style={{
          height: "100%",
          width: "100%",
          // justifyContent: "space-evenly",
          backgroundColor: "#00000999",
        }}
      >
        <ImageHeader title={basicInfoData?.enclosure_code ?? "MK001"} />
        <View
          style={{
            justifyContent: "center",
            // borderWidth: 1,
          }}
        >
          <View
            style={{
              borderRadius: 10,
              marginLeft: widthPercentageToDP(6),
              paddingTop: heightPercentageToDP(4),
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "600",
                fontSize: 22,
              }}
            >
              {basicInfoData.enclosure_code ?? "MK001"}
            </Text>
          </View>

          <View style={styles.inChargeBox}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.firstTextStyle}>In Charge</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                height: heightPercentageToDP(4),
                width: widthPercentageToDP(18),
                alignItems: "center",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "rgba(131, 157, 141, 1)",
                marginLeft: widthPercentageToDP(2),
              }}
            >
              <Image source={require("../../../assets/person.png")} />
              <Text style={{ fontSize: 14, color: Colors.white }}>
                {basicInfoData.incharge_name ?? "Shera"}
              </Text>
            </View>
            <View
              style={{
                height: heightPercentageToDP(4),
                width: widthPercentageToDP(8),
                marginLeft: widthPercentageToDP(1),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "rgba(131, 157, 141, 1)",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}
            >
              <Image source={require("../../../assets/call.png")} />
            </View>

            <View
              style={{
                height: heightPercentageToDP(4),
                width: widthPercentageToDP(8),
                marginLeft: widthPercentageToDP(1),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "rgba(131, 157, 141, 1)",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}
            >
              <Image source={require("../../../assets/chat.png")} />
            </View>
          </View>
          <View style={styles.secondItemBox}>
            <Text style={styles.firstTextStyle}>Section - </Text>
            <Text style={styles.firstTextStyle}>
              {basicInfoData.section_name ?? "Mount Kailash"}
            </Text>
          </View>
          <View style={styles.chipWrap}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                margin: widthPercentageToDP(1.5),
              }}
            >
              <Chip
                style={{
                  backgroundColor: "#EFF5F2",
                  borderRadius: 5,
                  marginRight: widthPercentageToDP(1),
                  // width : "35%"
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#1F515B",
                  }}
                >
                  Occupants 20
                </Text>
              </Chip>
              <Chip
                style={{
                  backgroundColor: "#EFF5F2",
                  borderRadius: 5,
                  marginRight: widthPercentageToDP(1),
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#1F515B",
                  }}
                >
                  Species 2
                </Text>
              </Chip>
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
      </View>
    </>
  );
};

export const Body = ({
  birthDate,
  localId,
  collection,
  enclosure,
  navigation,
  animalDetails,
  isCheckedId,
  onValueChacked,
  animalData,
  basicInfoData,
}) => {
  const TAB_HEADER_ITEMS = [
    {
      id: "0",
      title: "Occupants",
      screen: "Occupants",
    },
    {
      id: "1",
      title: "Basic Info",
      screen: "Basicinfo",
    },
    {
      id: "2",
      title: "History",
      screen: "History",
    },
  ];

  const [screen, setScreen] = useState("Occupants");

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
          {screen === "Occupants" ? (
            <Occupants
              birthDate={birthDate}
              localId={localId}
              collection={collection}
              enclosure={enclosure}
              isCheckedId={isCheckedId}
              onValueChacked={onValueChacked}
              animalData={animalData}
            />
          ) : screen === "Basicinfo" ? (
            <Basicinfo basicInfoData={basicInfoData} />
          ) : screen === "History" ? (
            <History />
          ) : null}
        </View>
      </View>
    </>
  );
};

const History = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", color: Colors.green }}>
        Welcome to History Page
      </Text>
    </View>
  );
};
const Basicinfo = ({ basicInfoData }) => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosure Name</Text>
                <Text style={styles.cardContentData}>
                  {basicInfoData.user_enclosure_name}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Parent Enclosure</Text>
                <Text style={styles.cardContentData}>LR</Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Section</Text>
                <Text style={styles.cardContentData}>
                  {basicInfoData?.section_name}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Site</Text>
                <Text style={styles.cardContentData}>
                  {basicInfoData?.site_name ?? "Conures"}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosure Type</Text>
                <Text style={styles.cardContentData}>
                  {basicInfoData?.enclosure_type}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Sunlight</Text>
                <Text style={styles.cardContentData}>
                  {capitalize(basicInfoData.enclosure_sunlight)}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Environment Type</Text>
                <Text style={styles.cardContentData}>
                  {capitalize(basicInfoData.enclosure_environment)}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Movable</Text>
                <Text style={styles.cardContentData}>
                  {basicInfoData.enclosure_is_movable == "0" ? (
                    <Text>False</Text>
                  ) : (
                    <Text>True</Text>
                  )}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Surveillance</Text>
                <Text style={styles.cardContentData}>Cam - 00123</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Status</Text>
                <Chip
                  mode="outlined"
                  style={{
                    // height: heightPercentageToDP(3),
                    // width: widthPercentageToDP(15),
                    backgroundColor: "#52F990",
                    color: "black",
                    borderRadius: 5,
                  }}
                >
                  <Text>
                    {capitalize(basicInfoData.enclosure_status) ?? "Active"}
                  </Text>
                </Chip>
              </View>
            </View>
            <View style={styles.cardContentRow}></View>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

const Occupants = ({ isCheckedId, onValueChacked, animalData }) => {
  console.log("THIS IS ANIMAL DATA--------------------", animalData);
  const route = useRoute();
  return (
    <>
      <View style={{ marginHorizontal: 14 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={animalData}
          renderItem={({ item }) => (
            <CustomCard
              title={capitalize(item?.common_name)}
              subtitle={capitalize(item?.scientific_name)}
              // svgUri={item.image}
              icon={item.image}
              checkbox={
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Checkbox
                    status={
                      isCheckedId(item?.animal_id) ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      onValueChacked(item?.animal_id);
                    }}
                  />
                </View>
              }
              rightIcon={
                <View
                  style={{
                    marginHorizontal: widthPercentageToDP(10),
                    marginVertical: widthPercentageToDP(5),
                  }}
                >
                  <AntDesign name="right" size={14} color="black" />
                </View>
              }
              chips={
                <View style={styles.tagMainCont}>
                  <View
                    style={
                      item?.sex == "male"
                        ? [styles.tagsContainer, { backgroundColor: "#DAE7DF" }]
                        : item?.sex == "female"
                        ? [styles.tagsContainer, { backgroundColor: "#00D6C9" }]
                        : {}
                    }
                    onStartShouldSetResponder={() => true}
                  >
                    <View
                      styles={
                        item.sex == "male"
                          ? styles.malechipM
                          : item?.sex == "female"
                          ? styles.femalechipF
                          : item?.sex == "undetermined"
                          ? styles.undeterminedChip
                          : item?.sex == "indetermined"
                          ? styles.indeterminedChip
                          : {}
                      }
                    >
                      <Text
                        style={
                          item?.sex == "male"
                            ? styles.malechipText
                            : item.sex == "female"
                            ? styles.femalechipText
                            : item?.sex == "undetermined"
                            ? styles.undeterminedText
                            : item?.sex == "indetermined"
                            ? styles.indeterminedText
                            : // : item?.sex == "female"
                              // ? styles.femalechipF
                              {}
                        }
                      >
                        {item?.sex == "male"
                          ? `M`
                          : item?.sex == "female"
                          ? `F`
                          : item?.sex == "undetermined"
                          ? `UD`
                          : item?.sex == "indetermined"
                          ? `ID`
                          : null}
                      </Text>
                    </View>
                  </View>
                </View>
              }
            />
          )}
        />
      </View>
    </>
  );
};

const OccupantScreen = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [animalData, setAnimalData] = useState([]);
  const [basicInfoData, setBasicInfoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();

  // For checkbox
  const isCheckedId = (id) => {
    return checkedItems.includes(id);
  };
  const onValueChacked = (id) => {
    if (isCheckedId(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  // API implementation for Animal List by Enclosure Id
  useEffect(() => {
    let requestObj = {
      enclosure_id: route.params.enclosure_id,
    };
    setIsLoading(true);
    getAnimalListBySections(requestObj)
      .then((res) => {
        console.log(
          "THIS IS ANIMAL LIST BY ENCLOSURE LIST=======",
          res.data.basic_info
        );
        setAnimalData(res.data.animal_list);
        setBasicInfoData(res?.data?.basic_info);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={[styles.container]}>
      <Loader visible={isLoading} />
      <View style={[{ flex: 0.6 }]}>
        <ImageBackground
          style={styles.images}
          source={require("../../../assets/parrot.jpeg")}
        >
          <View style={{ backgroundColor: "#00000777" }}>
            <OverlayContent basicInfoData={basicInfoData} />
          </View>
        </ImageBackground>
      </View>
      <Body
        style={styles.bodyContainer}
        isCheckedId={isCheckedId}
        onValueChacked={onValueChacked}
        animalData={animalData}
        basicInfoData={basicInfoData}
      />
    </View>
  );
};

export default OccupantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    height: "110%",
  },
  inChargeBox: {
    flexDirection: "row",
    marginLeft: widthPercentageToDP(6),
  },
  firstTextStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.white,
    textAlign: "left",
  },
  secondItemBox: {
    flexDirection: "row",
    marginLeft: widthPercentageToDP(6),
    marginTop: heightPercentageToDP(0.5),
  },

  bodyContainer: {
    position: "relative",
    bottom: 0,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: "6%",
  },

  // Header Container
  // headerContainer: {
  //   flex: 0.15,
  // },

  linearGradient: {
    width: "100%",
    height: "100%",
  },

  name: {
    color: "white",
    fontSize: 28,
    marginVertical: 2,
  },

  scientificName: {
    color: "white",
    fontStyle: "italic",
    fontSize: 13,
    marginVertical: 2,
  },

  sexAndAge: {
    flexDirection: "row",
    marginVertical: 2,
  },

  sex: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  fourthRow: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },

  age: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  enclosureAndRingId: {
    flexDirection: "row",
    marginVertical: 2,
  },

  enclosure: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  ringId: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  tagAndHash: {
    flexDirection: "row",
    marginVertical: 8,
  },

  tagContainer: {
    borderRadius: 6,
    backgroundColor: "#ffeaf3",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 2,
  },

  tagText: {
    color: "#c65f71",
    fontSize: 20,
  },

  hashContainer: {
    borderRadius: 6,
    backgroundColor: "#338bf2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 4,
  },

  hashText: {
    color: "white",
    fontSize: 12,
  },

  textShadow: {
    textShadowColor: "#0000004d",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },

  // Body Container

  boxShadow: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },

  tabHeaderWrapper: {
    flex: 0.12,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },

  tabHeader: {
    marginLeft: 10,
  },

  tabHeaderItemWrapper: {
    // paddingVertical: 4,
    marginHorizontal: 30,
  },

  tabIcon: {
    fontSize: 16,
    marginHorizontal: 4,
    top: 4,
  },

  tabHeaderItem: {
    padding: 4,
    color: "grey",
    fontSize: 14,
    fontWeight: "600",
  },

  tabBody: {
    flex: 1,
    backgroundColor: "#DAE7DF",
  },

  card: {
    marginHorizontal: "4%",
    marginVertical: "3%",
    backgroundColor: "white",
  },

  cardContentRow: {
    flexDirection: "row",
    marginHorizontal: "2%",
    marginVertical: "2%",
  },

  cardContentItem: {
    flex: 0.5,
  },

  cardContentTitle: {
    color: "grey",
    fontSize: 13,
  },

  cardContentData: {
    color: "black",
    fontSize: 15,
  },

  // Utilities
  markNode: {
    borderColor: "red",
    borderWidth: 1,
  },
  tagMainCont: {
    marginLeft: 3,
    // paddingTop: "4%",
    // backgroundColor:"red",
    // borderWidth:2
  },
  tagsContainer: {
    flexDirection: "row",
    // backgroundColor: "#DAE7DF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 5,
    fontWeight: 500,
    // borderWidth:1
  },

  malechipM: {
    backgroundColor: "#DAE7DF",

    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 5,
    fontWeight: 700,
    // borderWidth:1
  },
  femalechipF: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#00D6C9",
    fontWeight: 500,
    marginLeft: 5,
    borderWidth: 2,
  },
  malechipText: {
    fontSize: 15,
    // backgroundColor: "#00D6C9",
    color: "#1F515B",
    // color: "red",
  },
  femalechipText: {
    fontSize: 15,
    color: "#1F515B",
  },

  undeterminedChip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "red",
    fontWeight: 500,
    marginLeft: 5,
    // borderWidth:2
  },
  undeterminedText: {
    marginLeft: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 15,
    backgroundColor: "rgba(255, 211, 211, 1)",
    color: "rgba(31, 81, 91, 1)",
  },
  indeterminedText: {
    marginLeft: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 15,
    backgroundColor: "rgba(255, 211, 211, 1)",
    color: "rgba(31, 81, 91, 1)",
  },
  chipWrap: {
    marginHorizontal: 20,
  },
});
