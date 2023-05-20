import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GetDetailesEnclosure } from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../configs/Colors";
import { useSelector } from "react-redux";
import { widthPercentageToDP } from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

const moreOptionData = [
  { id: 1, option: "Edit Enclosure", screen: "EnclosureEdit" },
  { id: 2, option: "Delete Enclosure", screen: "", purpose: "delete" },
  { id: 3, option: "Change Enclosure", screen: "changeEnclosure" },
  { id: 4, option: "Animal in Enclosure", screen: "AnimalEnclosure" },
];

const EnclosureDetails = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoding] = useState(false);
  const [enclosuredata, setEnclosureData] = useState({});
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {}, [navigation]);
    let { enclosure_id } = route.params;
    setLoding(true);
    GetDetailesEnclosure(enclosure_id)
      .then((res) => {
        console.log("resData>>>>>>>>>>>>>>>>>>>>>>>>>>", res);
        setEnclosureData(res.data[0]);
      })
      .finally(() => {
        setLoding(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return unsubscribe;
  }, [navigation]);

  const chooseOption = (item) => {
    navigation.navigate(item.screen, { item: enclosuredata });
  };

  return (
    <>
      <Header
        title="Enclosure Details"
        noIcon={true}
        optionData={moreOptionData}
        optionPress={chooseOption}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: isSwitchOn ? "#1F415B" : "#DAE7DF" },
        ]}
      >
        <View>
          <Loader visible={loading} />
          <View style={[styles.innerContainer]}>
            <View style={styles.row}>
              <Text style={{ marginHorizontal: 5 }}>Id:</Text>
              <Text>{`#${enclosuredata.enclosure_id}`}</Text>
            </View>
            {/* <Text style={styles.idNumber}>{data.status}</Text> */}
            <View style={styles.row}>
              <Text style={{ marginHorizontal: 5 }}>Name:</Text>
              <Text>{enclosuredata.user_enclosure_name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={{ marginHorizontal: 5 }}>Code:</Text>
              <Text>{enclosuredata.enclosure_code}</Text>
            </View>
            <View style={[styles.row]}>
              <Text style={{ marginHorizontal: 5 }}>Descripation :</Text>
              <Text style={{ width: widthPercentageToDP(30) }}>
                {enclosuredata.enclosure_desc}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={{ marginHorizontal: 5 }}>Environment :</Text>
              <Text>{enclosuredata.enclosure_environment}</Text>
            </View>
            <View style={styles.row}>
              <Text style={{ marginHorizontal: 5 }}>Sunlite :</Text>
              <Text>{enclosuredata.enclosure_sunlight}</Text>
            </View>
          </View>
        </View>
        {/* <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            // if (data.user_details.personal_details === null) {
            navigation.navigate("changeEnclosure", { item: enclosuredata });
            // } else {
            // navigation.navigate("ShowPersonalDetails", { item: data })
            // }
          }}
        >
          <Text style={styles.buttonText}>Change Enclosure</Text>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            // if (data.user_details.personal_details === null) {
            navigation.navigate("AnimalEnclosure", {
              enclosure_id: enclosuredata.enclosure_id,
            });
            // } else {
            // navigation.navigate("ShowPersonalDetails", { item: data })
            // }
          }}
        >
          <Text style={styles.buttonText}>Animal in enclosure</Text>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EnclosureEdit", { items: enclosuredata })
          }
          style={{
            boxSizing: "borderBox",
            display: "flex",
            textAlign: "center",

            right: 0,
            top: 10,
            width: "30%",
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
            Enclosure Edit{" "}
          </Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 30,
    alignItems: "center",
  },

  innerContainer: {
    backgroundColor: "rgba(100,100,100,0.2)",
    alignItems: "center",
    padding: 8,
    marginVertical: 20,
    marginHorizontal: "10%",
    width: width * 0.9,
    height: height * 0.5,
    justifyContent: "space-evenly",
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    // backgroundColor:'red',
    width: width * 0.8,
    justifyContent: "space-between",
    // marginHorizontal:20
  },
  buttonContainer: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGrey,
    marginTop: 10,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 15,
  },
});

export default EnclosureDetails;
