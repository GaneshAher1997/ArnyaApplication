// Date:- 4 April 2023
// Name:- Ganesh Aher
// Work:- 1.this component i called Get-Egg-Details API on Header,Body And Footer Design
//        2.Add moment Formate on API's date.

// Name : Wasim akram
//  work :- moment days difference  function added  to the header hatchinng part, hatching_period value also added by wasim akram.
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/Loader";
import moment from "moment/moment";
import { getEggsDetails } from "../../services/EggsService";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const EggDetails = (props) => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [Father, setFather] = useState("");
  const [Mother, setMother] = useState("");
  const [day, setDay] = useState("");
  const [taxonomyID, setTaxonomyID] = useState( props.route.params?.item.taxonomy_id ?? 0)

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = () => {
    setIsLoading(true);
    let egg_id = props.route.params?.item.egg_id;
    getEggsDetails({ egg_id })
      .then((res) => {
        res.data.taxonomy_id = taxonomyID
        console.log("Egg Details Data Response", res);
        setData(res.data);
        const oldDate = moment(res.data.lay_date);
        const newDate = moment(new Date());
        let result = oldDate.diff(newDate, "days");
        setDay(result);
        if (res.data.parent_male.length > 0) {
          let parentFather = res.data.parent_male[0].parents
            .map((value) => value.local_id)
            .join(", ");
          let parentMother = res.data.parent_female[0].parents
            .map((value) => value.local_id)
            .join(", ");
          setFather(parentFather);
          setMother(parentMother);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.masterContainer}>
        <Loader visible={isLoading} />
        <Header
          style={styles.headerContainer}
          imageBackground={undefined}
          item={data}
          day={day}
        />
        <Body
          style={styles.bodyContainer}
          item={data}
          parents={{ Father, Mother }}
        />

        <Footer style={styles.footerContainer} item={data} />
      </View>
    </>
  );
};

export default EggDetails;

const Header = ({ imageBackground, item, day }) => {
  const navigation = useNavigation();

  const overlayContent = (
    <>
      <View
        style={[
          {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: wp(4),
            marginTop: hp(1),
          },
        ]}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={"white"}
          onPress={() => navigation.goBack()}
        />
        <MaterialCommunityIcons
          color={"white"}
          name="dots-vertical"
          size={30}
        />
      </View>
      <View style={styles.overlayContent}>
        <View style={styles.firstRow}>
          <View style={styles.leftSide}>
            <FontAwesome5
              style={[styles.eggIcon, styles.textShadow]}
              name="egg"
            />
            <Text style={[styles.eggCount, styles.textShadow]}>
              Egg #{item.egg_id}
            </Text>
          </View>
          <View style={styles.rightSide}>
            {item.hatching_period === null ? null : (
              <View style={styles.gestationTime}>
                <Text
                  style={[styles.textShadow, { color: "white", fontSize: 12 }]}
                >
                  DAY
                </Text>
                <Text
                  style={[styles.textShadow, { color: "white", fontSize: 42 }]}
                >
                  {day}
                </Text>
                <Text
                  style={[styles.textShadow, { color: "white", fontSize: 8 }]}
                >
                  {item.hatching_period} days
                </Text>
                <Text
                  style={[styles.textShadow, { color: "white", fontSize: 8 }]}
                >
                  Gestation
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.secondRow}>
          <Text style={[styles.textShadow, { color: "white" }]}>
            Status -{" "}
            <Text style={[styles.textShadow, { fontWeight: "bold" }]}>
              {item.fertility}
            </Text>
          </Text>
        </View>
        <View style={styles.thirdRow}>
          <Text style={[styles.textShadow, { color: "white" }]}>
            Species -{" "}
            <Text style={[styles.textShadow, { fontWeight: "bold" }]}>
              {item.vernacular_name}
            </Text>
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        {imageBackground !== undefined ? (
          <ImageBackground
            style={styles.bgImage}
            source={{ uri: imageBackground }}
          >
            {overlayContent}
          </ImageBackground>
        ) : (
          <LinearGradient
            colors={["#224459", "#39ab6b"]}
            style={styles.linearGradient}
          >
            {overlayContent}
          </LinearGradient>
        )}
      </View>
    </>
  );
};

const Body = ({ item, parents }) => {
  return (
    <>
      <View style={styles.bodyContainer}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}>Accession Type</Text>

              <Text style={styles.description}>{item.accession} </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}>Lay Date</Text>

              <Text style={styles.description}>
                {moment(item.lay_date).format("MMM Do YY")}
              </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.title}>Found Date</Text>
              <Text style={styles.description}>
                {moment(item.found_date).format("MMM Do YY")}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}>Parent Female</Text>

              <Text style={styles.description}>{parents.Mother}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.title}>Parent Male</Text>
              <Text style={styles.description}>{parents.Father}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}>Nest Location</Text>
              <Text style={styles.description}>===</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.title}>Clutch</Text>
              <Text style={styles.description}>{item.clutch}</Text>
            </View>
          </View>
          {/* <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.title}>Fertility Status</Text>
              <Text style={styles.description}>{item.fertility}</Text>
            </View>
          </View> */}
          <View style={styles.row}>
            <View style={[styles.column, { flex: 1 }]}>
              <Text style={styles.title}>Fertility Assessment Method</Text>
              <Text style={styles.description}>
                {item.fertility_assessment_method_label}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.column]}>
              <Text style={styles.title}>Incubation Type</Text>
              <Text style={styles.description}>
                {item.incubation_type_label}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const Footer = ({ item }) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => console.log("Hello, World!")}>
          <View style={styles.footerItem}>
            <MaterialIcons name="content-copy" style={styles.footerIcon} />
            <Text style={styles.footerText}>Copy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditEggForm", { item: item })}
        >
          <View style={styles.footerItem}>
            <MaterialCommunityIcons
              name="pencil-outline"
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Hello, World!")}>
          <View style={styles.footerItem}>
            <MaterialCommunityIcons name="egg-easter" size={24} color="black" />
            <Text style={styles.footerText}>Hatched</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // Master Container
  masterContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  // Header Container
  headerContainer: {
    flex: 0.4,
    backgroundColor: "red",
  },

  bgImage: {
    width: "100%",
    height: "100%",
  },

  linearGradient: {
    width: "100%",
    height: "100%",
  },

  overlayContent: {
    width: "80%",
    height: "80%",
    margin: "10%",
  },

  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textShadow: {
    textShadowColor: "#0000004d",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },

  eggIcon: {
    color: "white",
    fontSize: 66,
  },

  eggCount: {
    color: "white",
    fontSize: 22,
  },

  leftSide: {
    justifyContent: "space-evenly",
  },

  rightSide: {
    alignItems: "flex-end",
  },

  gestationTime: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000004d",
    borderColor: "#59ef86",
    borderWidth: 5,
    borderRadius: 60,
  },

  // Body Container
  bodyContainer: {
    position: "relative",
    bottom: 20,
    flex: 0.55,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: "6%",
  },

  row: {
    paddingTop: "4%",
    paddingBottom: "4%",
    marginHorizontal: "8%",
    flexDirection: "row",
  },

  column: {
    flex: 0.5,
  },

  title: {
    color: "slategrey",
    fontSize: 12,
  },

  description: {
    color: "dimgrey",
    fontSize: 14,
  },

  // Footer Container
  footerContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#eaf3f0",
  },

  footerItem: {
    justifyContent: "center",
    alignItems: "center",
  },

  footerIcon: {
    fontSize: 20,
    color: "dimgrey",
  },

  footerText: {
    fontSize: 12,
    color: "slategrey",
  },
});
