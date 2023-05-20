import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import FloatingButton from "../../components/FloatingButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { capitalize } from "../../utils/Utils";
//Import API CALLS
import { getHierarchy, getSpeciesAnimals } from "../../services/StatsService";
import { Avatar, Card, Checkbox, Chip } from "react-native-paper";
import CustomCard from "../../components/CustomCard";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ImageHeader from "../../components/ImageHeader";
import StatsBlock from "../../components/StatsBlock";
import Loader from "../../components/Loader";

const OverlayContent = (props) => {

  // console.log("THIS IS THE ICON PROPS: ", props.icon);

  return (
    <>
      <View
        style={{
          height: "100%",
          // width: "100%",
          justifyContent: "space-between",
          backgroundColor: "#00000066",
        }}
      >
        <ImageHeader title={props.headerTitle} />
        {props.desc ? (
                <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginBottom: 40,
                  flexDirection: "row",
                  // marginTop: 10
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>
                  {capitalize(props.title)}
                  </Text>
                  {
                    props.subtitle?
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                  {capitalize(props.subtitle)}
                  </Text> : null
                  }
                </View>
                <View
                  style={{
                    // borderColor: "#00000",
                    // borderWidth: 2,
                    // borderRadius: 50,
                    position: "relative"
                  }}
                >
                  <MaterialCommunityIcons
                    name="information-variant"
                    size={22}
                    color="white"
                    style={{ backgroundColor: "#00000" }}
                  />
                </View>
                </View>
        ) : null}

        {/* {props.icon ? (
          <View
            style={{
              justifyContent: "flex-end",
              alignSelf: "flex-end",
              bottom: 20,
              right: 15,
            }}
          >
            <MaterialCommunityIcons
              name="information-variant"
              size={22}
              color="white"
              style={{
                backgroundColor: "#00000",
                borderColor: "#00000",
                borderWidth: 2,
                borderRadius: 50,
              }}
            />
          </View>
        ) : null} */}
      </View>
    </>
  );
};

const topBarHeight = heightPercentageToDP(30);

export default function ComonNameDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const [subtitle, setSubtitle] = useState(route.params.subtitle);
  const [title, setTitle] = useState(route.params.title);

  const [shiftHeader, setShiftHeader] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [AnimatedHeaderValue] = useState(new Animated.Value(0));
  const Header_Maximum_Height = showImage ? heightPercentageToDP(30) :heightPercentageToDP(18);
  //Max Height of the Header
  const Header_Minimum_Height = heightPercentageToDP(10);
  //Min Height of the Header

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height],
    outputRange: ["#4286F4", "#fff"],
    extrapolate: "clamp",
  });

  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height],
    outputRange: [Header_Maximum_Height, heightPercentageToDP(5.5)],
    extrapolate: "clamp",
  });


  const handleScroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y: AnimatedHeaderValue } },
      },
    ],
    {
      useNativeDriver: false,
      listener: (event) => {
        let currentOffset = event.nativeEvent.contentOffset.y;
        let header = currentOffset > 110 ? true : false;
        setShiftHeader(header);
      },
    }
  );

  const [Loading, setLoading] = React.useState(false);

  //Getting current ZooID
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  //Control HomeStat Card
  const [tags, setTags] = useState(route.params.tags);

  //HomeStat Data
  const [orderHierchyData, setOrderHierchyData] = useState([]);
  useEffect(() => {
    setLoading(true);
    // console.log(route.params.title);
    getSpeciesAnimals({
      zoo_id: zooID,
      parent_tsn: route.params?.tsn_id ?? 0,
    })
      .then((res) => {
        setOrderHierchyData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log("Stats Err", err));
  }, []);

  const [checkedItems, setCheckedItems] = useState([]);

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

  return (
    <>
      <Loader visible={Loading} />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
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
                <View>
                  <OverlayContent
                    navigation={navigation}
                    desc={!shiftHeader}
                    title={shiftHeader ? capitalize(title) : title}
                    headerTitle={shiftHeader ? capitalize(title) : null}
                    subtitle={subtitle}
                    icon={showIcon}
                  />
                </View>
            </View>
          </Animated.View>
          {Loading ? null : (
            <View style={{ backgroundColor: "#DAE7DF" }}>
              <Card style={styles.cardContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: heightPercentageToDP(1),
                    marginLeft: 10,
                  }}
                >
                  <StatsBlock
                    insightData={orderHierchyData.total_animals}
                    label="Total"
                    borderColor="#37BD69"
                    borderWidth={2}
                    backgroundColor={"white"}
                  />
                  <StatsBlock
                    insightData={orderHierchyData.total_sections}
                    label="Sections"
                    borderColor="#1F515B"
                    borderWidth={1}
                  />
                  <StatsBlock
                    insightData={orderHierchyData.total_enclosure}
                    label="Enclosures"
                    borderColor="#1F515B"
                    borderWidth={1}
                  />
                </View>
                <View
                  style={{
                    padding: 12,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View>
                      {tags ? (
                        <View>
                          <View
                            style={styles.tagsContainer}
                            onStartShouldSetResponder={() => true}
                          >
                            {Object.keys(tags).map((key) => (
                              <View
                                key={key}
                                style={
                                  key == "male"
                                    ? styles.malechip
                                    : key == "female"
                                    ? styles.femalechip
                                    : key == "undetermined"
                                    ? styles.undeterminedChip
                                    : key == "indetermined"
                                    ? styles.indeterminedChip
                                    : {}
                                }
                              >
                                <Text
                                  style={
                                    key == "male"
                                      ? styles.malechipText
                                      : key == "female"
                                      ? styles.femalechipText
                                      : key == "undetermined"
                                      ? styles.undeterminedText
                                      : key == "indetermined"
                                      ? styles.indeterminedText
                                      : {}
                                  }
                                >
                                  {key == "male"
                                    ? `M - ${tags[key]}`
                                    : key == "female"
                                    ? `F - ${tags[key]}`
                                    : key == "undetermined"
                                    ? `UD - ${tags[key]}`
                                    : key == "indetermined"
                                    ? `ID - ${tags[key]}`
                                    : null}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  <View
                    style={[styles.tagsContainer]}
                    onStartShouldSetResponder={() => true}
                  >
                    {Object.keys(tags).map((key) => (
                      <View
                        key={key}
                        style={
                          key == "undetermined"
                            ? styles.undeterminedChipB1
                            : key == "indetermined"
                            ? styles.indeterminedChipE1
                            : {}
                        }
                      >
                        <Text
                          style={
                            key == "undetermined"
                              ? styles.undeterminedText
                              : key == "indetermined"
                              ? styles.indeterminedText
                              : {}
                          }
                        >
                          {key == "undetermined"
                            ? `B-1`
                            : key == "indetermined"
                            ? `E-1`
                            : null}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Card>
            </View>
          )}
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#DAE7DF", flex: 1 }}
            onScroll={handleScroll}
          >
            <FlatList
              data={orderHierchyData.animals}
              renderItem={({ item }) => {
                // console.log({ item });
                return (
                  <View style={{ marginHorizontal: 14 }}>
                    <CustomCard
                      title={
                        item.local_id == "" || item.local_id == null
                          ? item.animal_id
                          : item.local_id
                      }
                      onPress={() =>
                        navigation.navigate("AnimalsDetails", {
                          animal_id: item.animal_id,
                        })
                      }
                      icon={route.params.icon}
                      chips={
                        <View>
                          {tags ? (
                            <View>
                              <View
                                style={styles.tagsContainer}
                                onStartShouldSetResponder={() => true}
                              >
                                {Object.keys(tags).map((key) => (
                                  <View
                                    key={key}
                                    style={
                                      key == "male"
                                        ? styles.malechipM
                                        : key == "female"
                                        ? styles.femalechipF
                                        : {}
                                    }
                                  >
                                    <Text
                                      style={
                                        key == "male"
                                          ? styles.malechipText
                                          : key == "female"
                                          ? styles.femalechipText
                                          : {}
                                      }
                                    >
                                      {key == "male"
                                        ? `M `
                                        : key == "female"
                                        ? `F `
                                        : null}
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          ) : null}
                        </View>
                      }
                      subtitle={
                        "Enclosure ID: " +
                        item.enclosure_code +
                        "\nSection - " +
                        item.section_name
                      }
                      checkbox={
                        <View
                          style={{
                            marginHorizontal: widthPercentageToDP(1),
                            marginVertical: widthPercentageToDP(4),
                          }}
                        >
                          <Checkbox.Android
                            status={
                              isCheckedId(item.animal_id)
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={() => onValueChacked(item.animal_id)}
                            //  color ="#757575"
                          />
                        </View>
                      }
                      rightIcon={
                        <View
                          style={{
                            marginHorizontal: widthPercentageToDP(10),
                            marginVertical: widthPercentageToDP(6.5),
                          }}
                        >
                          <AntDesign name="right" size={14} color="black" />
                        </View>
                      }
                      sex={item.sex}
                      count={item.animal_count}
                    />
                  </View>
                );
              }}
            />
          </ScrollView>
        </View>
        <FloatingButton
          icon={"plus-circle-outline"}
          onPress={() => {
            navigation.navigate("AnimalAddDynamicForm", {
              tsn_id: route.params?.tsn_id,
              tsn: route.params.title,
            });
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header Container
  headerContainer: {
    // flex: 1,
    height: "100%",
    width: "100%",
  },
  bgImage: {
    height: "100%",
    width: "100%",
  },
  row: {
    paddingTop: "4%",
    paddingBottom: "4%",
    marginHorizontal: "8%",
    flexDirection: "row",
  },
  title: {
    color: "slategrey",
    fontSize: 12,
  },
  cardContainer: {
    marginHorizontal: 14,
    marginVertical: 8,
    marginTop: 12,
    height: heightPercentageToDP(17),
    backgroundColor: "#F2FFF8",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 10,
  },
  cardTitle: {
    color: "#006D35",
    fontWeight: "600",
    fontSize: 15,
    margin: 15,
  },
  cardNumber: {
    fontSize: 36,
    fontWeight: "600",
    color: "#1F515B",
  },
  cardNumberTitle: {
    color: "#666666",
  },
  dataRow: {
    alignItems: "center",
  },
  tagsContainer: {
    flexDirection: "row",
  },
  tag: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    // paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },

  malechip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#DAE7DF",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  femalechip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#DAE7DF",
    fontWeight: 500,
    marginLeft: 5,
  },
  undeterminedChip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#FFD3D3",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  indeterminedChip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#F0F4FE",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  malechipText: {
    fontSize: 12,
    color: "#1F515B",
  },
  femalechipText: {
    fontSize: 12,
    color: "#1F515B",
  },
  undeterminedText: {
    fontSize: 12,
    color: "#1F515B",
  },
  indeterminedText: {
    fontSize: 12,
    color: "#1F515B",
  },
  undeterminedChipB1: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#00D6C9",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  indeterminedChipE1: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#52F990",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  malechipM: {
    backgroundColor: "#DAE7DF",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 5,
    fontWeight: 500,
  },
  femalechipF: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#00D6C9",
    fontWeight: 500,
    marginLeft: 5,
  },
});