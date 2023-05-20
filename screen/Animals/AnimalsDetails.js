// Name: Biswajit Chakraborty
// Creation Date: 10th April 2023
// Details: This is the AnimalDetails screen
// updated by  : Mohit
// date : 02/05/2023
// work  : added scroll animation
import { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
} from "react-native";

import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ImageHeader from "../../components/ImageHeader";
import { Button, Card, Menu } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DeleteAnimal, getAnimalDetails } from "../../services/AnimalService";
import moment from "moment/moment";
import { capitalize } from "../../utils/Utils";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";

const AnimalDetails = (props) => {
  const navigation = useNavigation();
  const [animalDetails, setAnimalDetails] = useState({});
  const [animalId, setAnimalId] = useState(props.route.params?.animal_id);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    let requestObj = {
      animal_id: animalId,
    };

    getAnimalDetails(requestObj)
      .then((response) => {
        setAnimalDetails(response.data);
      })
      .catch((error) => {
        console.log("THIS IS THE ERROR: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [animalId]);

  const [header, setHeader] = useState(false);
  const headerHide = (e) => {
    setHeader(e);
  };
  return (
    <>
      <SafeAreaProvider>
        <Loader visible={isLoading} />
        <View style={styles.masterContainer}>
          <Header
            style={styles.headerContainer}
            // imageBackground={"https://placekitten.com/1920/1080"}
            scientificName={animalDetails.complete_name}
            sex={animalDetails.sex}
            age={animalDetails.age}
            localIdType={animalDetails.local_id_type}
            localId={animalDetails.local_id}
            enclosure={animalDetails.user_enclosure_name}
            title={animalDetails.vernacular_name}
            label={animalDetails.label}
            birthDate={animalDetails.birth_date}
            navigation={navigation}
            header={header}
            animalDetails={animalDetails}
          />

          <Body
            style={styles.bodyContainer}
            animalDetails={animalDetails}
            birthDate={animalDetails.birth_date}
            localId={animalDetails.local_id}
            collection={animalDetails.master_collection_type}
            enclosure={animalDetails.user_enclosure_name}
            navigation={navigation}
            headerHide={(e) => headerHide(e)}
            header={header}
          />
        </View>
      </SafeAreaProvider>
    </>
  );
};

export default AnimalDetails;
let AnimatedHeaderValue = new Animated.Value(0);
const Header_Maximum_Height = 250;
//Max Height of the Header

const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
  inputRange: [0, Header_Maximum_Height],
  outputRange: ["#4286F4", "#fff"],
  extrapolate: "clamp",
});

const animateHeaderHeight = AnimatedHeaderValue.interpolate({
  inputRange: [0, Header_Maximum_Height],
  outputRange: [Header_Maximum_Height, 40],
  extrapolate: "clamp",
});

export const Header = ({
  imageBackground,
  scientificName,
  sex,
  age,
  localId,
  enclosure,
  title,
  label,
  birthDate,
  header,
  animalDetails,
}) => {
  const dob = moment(birthDate);
  const today = moment(new Date());
  const navigation = useNavigation();

  const gotoBack = () => navigation.goBack();

  const duration = moment.duration(today.diff(dob));

  const years = duration._data.years;
  const months = duration._data.months;
  const days = duration._data.days;

//  {
//   author : Mohit sharma
//  date 03.05.2023
     // desc : added scroll animation and header titile
// }
  {
    /*
        author : Arnab
        date: 3.5.23
        desc: added for more function
      */
  }
  const [moreOptionVisible, setMoreOptionVisible] = useState(false);
  const [moreOptionData, setMoreOptionData] = useState([
    { id: 1, option: "Edit Animal", screen: "AnimalEdit" },
    { id: 2, option: "Delete Animal", screen: "", purpose: "delete" },
    { id: 3, option: "Animal Mortality", screen: "AddDisposition" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const openMoreOption = () => setMoreOptionVisible(true);
  const closeMoreOption = () => setMoreOptionVisible(false);

  const optionPress = (item) => {
    setMoreOptionVisible(false);
    if (item.screen !== "") {
      navigation.navigate(item.screen, {
        item: animalDetails,
      });
    } else if (item.purpose == "delete") {
      DeleteAnimalData(animalDetails.animal_id);
    }
  };

  {
    /*
        author : Arnab
        date: 4.5.23
        desc: Delete animal
      */
  }
  const DeleteAnimalData = (id) => {
    let obje = {
      animal_id: id,
    };
    setIsLoading(true);
    DeleteAnimal(obje)
      .then((res) => {
        setIsLoading(false);
        if (res.success) {
          alert(res.message);
          setTimeout(() => {
            navigation.navigate("AnimalList");
          }, 500);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const overlayContent = (
    <>
    { header ? <View
        style={{
          padding: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor : "#fff"
        }}
      >
        <TouchableOpacity
          onPress={gotoBack}
          style={{
            left: 12,
            height: "100%",
          }}
        >
          <Ionicons name="arrow-back-outline" size={25} color="black" />
        </TouchableOpacity>
        {header ? (
          <Text style={{ fontSize: 18, color: "black" }}>
            {capitalize(String(title))}
          </Text>
        ) : null}
        {/*
        author : Arnab
        date: 3.5.23
        desc: added for more function
        */}
        <Menu
          visible={moreOptionVisible}
          onDismiss={closeMoreOption}
          anchor={
            <MaterialCommunityIcons
              color={"black"}
              name="dots-vertical"
              onPress={openMoreOption}
              size={30}
            />
          }
          statusBarHeight={15}
        >
          {moreOptionData.map((item, index) => {
            return (
              <Menu.Item
                onPress={() => optionPress(item)}
                title={item.option}
                key={index}
              />
            );
          })}
        </Menu>
      </View> : <View
        style={{
          padding: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
       
        }}
      >
        <TouchableOpacity
          onPress={gotoBack}
          style={{
            left: 12,
            height: "100%",
          }}
        >
          <Ionicons name="arrow-back-outline" size={25} color="white" />
        </TouchableOpacity>
        
      
        {/*
        author : Arnab
        date: 3.5.23
        desc: added for more function
        */}
        <Menu
          visible={moreOptionVisible}
          onDismiss={closeMoreOption}
          anchor={
            <MaterialCommunityIcons
              color={"white"}
              name="dots-vertical"
              onPress={openMoreOption}
              size={30}
            />
          }
          statusBarHeight={15}
        >
          {moreOptionData.map((item, index) => {
            return (
              <Menu.Item
                onPress={() => optionPress(item)}
                title={item.option}
                key={index}
              />
            );
          })}
        </Menu>
      </View>}
      <View style={styles.overlayContent}>
        {header ? null : (
          <View>
            <Text style={[styles.name, styles.textShadow]}>
              {capitalize(String(title))}
            </Text>
            <Text style={[styles.scientificName, styles.textShadow]}>
              {scientificName ? <Text>({scientificName})</Text> : ""}
            </Text>
            <View style={styles.sexAndAge}>
              <Text style={[styles.sex, styles.textShadow]}>
                Sex: {sex ? sex.charAt(0).toUpperCase() + sex.slice(1) : ""}
              </Text>
              <Text
                style={[
                  styles.age,
                  styles.textShadow,
                  { paddingHorizontal: 10 },
                ]}
              >
                Age: {years ? <Text>{years}y</Text> : null}{" "}
                {months ? <Text>{months}m</Text> : null}{" "}
                {days ? <Text>{days}d</Text> : null}
              </Text>
            </View>
            <View style={styles.enclosureAndRingId}>
              <Text style={[styles.enclosure, styles.textShadow]}>
                Enclosure: {enclosure ? enclosure : ""}
              </Text>
              <Text
                style={[
                  styles.ringId,
                  styles.textShadow,
                  { paddingHorizontal: 10 },
                ]}
              >
                {label ? label : ""}: {localId ? localId : ""}
              </Text>
            </View>
            <View style={styles.tagAndHash}>
              <View style={[styles.tagContainer, styles.boxShadow]}>
                <Text style={styles.tagText}>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>3</Text>{" "}
                  Open tags
                </Text>
              </View>
              <View style={[styles.hashContainer, styles.boxShadow]}>
                <Text style={styles.hashText}>#breeding</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );

  return (
    <>
      <Animated.View
        style={[
          styles.header,
          {
            height: animateHeaderHeight,
            backgroundColor: animateHeaderBackgroundColor,
          },
        ]}
      >
        <Loader visible={isLoading} />
        <View style={styles.headerContainer}>
          {imageBackground !== undefined ? (
            <ImageBackground
              style={styles.bgImage}
              source={{ uri: imageBackground }}
            >
              {overlayContent}
            </ImageBackground>
          ) : (
            <View style={{ backgroundColor: "#44544A" }}>{overlayContent}</View>
          )}
        </View>
      </Animated.View>
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
  headerHide,
  header
}) => {
  const TAB_HEADER_ITEMS = [
    {
      id: "0",
      title: "About",
      screen: "about",
    },
    {
      id: "1",
      title: "Mortality",
      screen: "mortality",
    },
    {
      id: "2",
      title: "Medical",
      screen: "medical",
    },
    {
      id: "3",
      title: "Enclosures",
      screen: "enclosure",
    },
    {
      id: "4",
      title: "Animal",
      screen: "animal",
    },
    {
      id: "5",
      title: "Birds",
      screen: "birds",
    },
    {
      id: "6",
      title: "Enclosures",
      screen: "enclosure",
    },
    {
      id: "7",
      title: "Enclosures",
      screen: "enclosure",
    },
    {
      id: "8",
      title: "Enclosures",
      screen: "enclosure",
    },
    {
      id: "9",
      title: "Enclosures",
      screen: "enclosure",
    },
    {
      id: "10",
      title: "Enclosures",
      screen: "enclosure",
    },
  ];

  const [screen, setScreen] = useState("about");

  const Item = ({ title, screenName,header }) => (
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
console.log(header)
  return (
    <>
      <View style={[styles.bodyContainer,{borderRadius: header ? 0 : 20}]}>
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
          {screen === "about" ? (
            <About
              birthDate={birthDate}
              localId={localId}
              collection={collection}
              enclosure={enclosure}
              headerHide={(e) => headerHide(e)}
            />
          ) : screen === "medical" ? (
            <Medical />
          ) : screen === "enclosure" ? (
            <Enclosure />
          ) : screen === "mortality" ? (
            <Mortality navigation={navigation} animalDetails={animalDetails} />
          ) : screen === "animal" ? (
            <Animal />
          ) : screen === "birds" ? (
            <Birds />
          ) : null}
        </View>
      </View>
    </>
  );
};

// PAGES ARE TEMPORARILY CREATED HERE

const About = ({ birthDate, localId, collection, enclosure, headerHide }) => {
  return (
    <>
      <Animated.ScrollView
      style={{flex :1}}
        scrollEventThrottle={20}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: AnimatedHeaderValue } },
            },
          ],
          {
            useNativeDriver: false,
            listener: (event) => {
              let currentOffset = event.nativeEvent.contentOffset.y;
              let direction = currentOffset > 240 ? true : false;
              headerHide(direction);
            },
          }
        )}
      >
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>
                  {moment(birthDate).format("MMM DD, YYYY")}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>
                  {localId ? localId : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>
                  {collection ? collection : ""}
                </Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>
                  {enclosure ? enclosure : ""}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </Animated.ScrollView>
    </>
  );
};

const Medical = () => {
  const TAB_HEADER_ITEMS = [
    {
      id: "1",
      title: "Basic",
      screen: "basic",
      iconNormal: <AntDesign name="hearto" style={styles.tabIcon} />,
      iconActive: (
        <AntDesign
          name="hearto"
          style={[styles.tabIcon, { color: "#39ab6b" }]}
        />
      ),
    },
    {
      id: "2",
      title: "Clinical Notes",
      screen: "clinicalNotes",
      iconNormal: <AntDesign name="filetext1" style={styles.tabIcon} />,
      iconActive: (
        <AntDesign
          name="filetext1"
          style={[styles.tabIcon, { color: "#39ab6b" }]}
        />
      ),
    },
    {
      id: "3",
      title: "Diagnosis",
      screen: "diagnosis",
      iconNormal: <FontAwesome name="stethoscope" style={styles.tabIcon} />,
      iconActive: (
        <FontAwesome
          name="stethoscope"
          style={[styles.tabIcon, { color: "#39ab6b" }]}
        />
      ),
    },
    {
      id: "4",
      title: "Diagnosis",
      screen: "diagnosis",
    },
    {
      id: "5",
      title: "Diagnosis",
      screen: "diagnosis",
    },
    {
      id: "6",
      title: "Diagnosis",
      screen: "diagnosis",
    },
    {
      id: "7",
      title: "Diagnosis",
      screen: "diagnosis",
    },
    {
      id: "8",
      title: "Diagnosis",
      screen: "diagnosis",
    },
  ];

  const [screen, setScreen] = useState("basic");

  const Item = ({ title, screenName, iconNormal, iconActive }) => (
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
        <View style={{ paddingHorizontal: 2 }}>
          {screenName === screen ? iconActive : iconNormal}
        </View>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.tabHeaderWrapper}>
          <FlatList
            style={styles.tabHeader}
            data={TAB_HEADER_ITEMS}
            renderItem={({ item }) => (
              <Item
                title={item.title}
                screenName={item.screen}
                iconNormal={item.iconNormal}
                iconActive={item.iconActive}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.tabBody}>
          {screen === "basic" ? (
            <Basic />
          ) : screen === "clinicalNotes" ? (
            <ClinicalNotes />
          ) : screen === "diagnosis" ? (
            <Diagnosis />
          ) : null}
        </View>
      </View>
    </>
  );
};

const Enclosure = () => {
  return (
    <>
      <View>
        <Text>Enclosure Screen</Text>
      </View>
    </>
  );
};

const Mortality = ({ navigation, animalDetails }) => {
  return (
    <>
      <View style={{ margin: 20, width: "90%" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddDisposition", { item: animalDetails });
          }}
          style={[
            styles.hashContainer,
            styles.boxShadow,
            { backgroundColor: "tomato" },
          ]}
        >
          <Text style={[styles.hashText, { textAlign: "center" }]}>
            Go to Mortality Page
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Animal = () => {
  return (
    <>
      <View>
        <Text>Animal Screen</Text>
      </View>
    </>
  );
};

const Birds = () => {
  return (
    <>
      <View>
        <Text>Birds Screen</Text>
      </View>
    </>
  );
};

const Basic = () => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: AnimatedHeaderValue },
              },
            },
          ],
          { useNativeDriver: false }
        )}
      >
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>Jan 01, 2023</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>13456789</Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>Macaw World</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>LR04</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>Jan 01, 2023</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>13456789</Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>Macaw World</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>LR04</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>Jan 01, 2023</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>13456789</Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>Macaw World</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>LR04</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>Jan 01, 2023</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>13456789</Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>Macaw World</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>LR04</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>Jan 01, 2023</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>13456789</Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>Macaw World</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>LR04</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>Jan 01, 2023</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>13456789</Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>Macaw World</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>LR04</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card} elevation={0}>
          <Card.Content>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Birth Date</Text>
                <Text style={styles.cardContentData}>Jan 01, 2023</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Local ID</Text>
                <Text style={styles.cardContentData}>13456789</Text>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Collection</Text>
                <Text style={styles.cardContentData}>Macaw World</Text>
              </View>
              <View style={styles.cardContentItem}>
                <Text style={styles.cardContentTitle}>Enclosures</Text>
                <Text style={styles.cardContentData}>LR04</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

const ClinicalNotes = () => {
  return (
    <>
      <View>
        <Text>Clinical Notes Screen</Text>
      </View>
    </>
  );
};

const Diagnosis = () => {
  return (
    <>
      <View>
        <Text>Diagnosis Screen</Text>
      </View>
    </>
  );
};

// STYLES STARTS FROM HERE

const styles = StyleSheet.create({
  // Master Container
  masterContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  // Header Container
  headerContainer: {
    flex: 0.5,
  },

  linearGradient: {
    width: "100%",
    height: "100%",
  },

  overlayContent: {
    width: "80%",
    height: "90%",
    marginHorizontal: "8%",
    marginVertical: "35%",
    marginTop: "8%",
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
    fontSize: 12,
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

  bodyContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "white",
    // borderRadius: 20,
    paddingTop: "6%",
  },

  tabHeaderWrapper: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },

  tabHeaderItemWrapper: {
    paddingVertical: 4,
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
  },

  card: {
    marginHorizontal: "4%",
    marginVertical: "3%",
    backgroundColor: "#e8f4f2",
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
});
