//modify By: gaurav shukla
//date:2-05-2023
//description: add the functions for the navigation footermedical

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Footermedical from "../../components/Footermedical";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import MedicalHeader from "../../components/MedicalHeader";
import { useDispatch, useSelector } from "react-redux";
import { setcaseType } from "../../redux/MedicalSlice";
import { useNavigation } from "@react-navigation/native";

const arr = [
  { id: 1, title: "Standard", backgroundColor: "rgba(55, 189, 105, 1)" },
  { id: 2, title: "Quarantine", backgroundColor: "rgba(250, 97, 64, 1)" },
  { id: 3, title: "Pre Shipment", backgroundColor: "rgba(0, 214, 201, 1)" },
  { id: 4, title: "Routine", backgroundColor: "rgba(55, 189, 105, 1)" },
];

const CaseType = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const caseType = useSelector((state) => state.medical.caseType);
  const [itmid, setItmeid] = useState(caseType.id);
  const [name, setNames] = useState(caseType.title);
  const clickFun = (item) => {
    setItmeid(item.id);
    setNames(item.title);
    dispatch(setcaseType(item));
  };
  const navigateNextScreen = () => {
    navigation.navigate("Searchanimal");
  };
  const navigatePreviousScreen = () => {
    navigation.navigate("Complaints");
  };

  return (
    <>
      <MedicalHeader
        title="Choose Case Type"
        noIcon={true}
        style={{
          paddingBottom: heightPercentageToDP("4%"),
          paddingTop: widthPercentageToDP("2%"),
        }}
      />
      <ScrollView style={{ backgroundColor: "white" }}>
        {arr.map((item, i) => {
          return (
            <TouchableOpacity activeOpacity={1} onPress={() => clickFun(item)}>
              <View
                style={[
                  styles.cont,
                  {
                    backgroundColor:
                      item.id !== itmid
                        ? "rgba(242, 255, 248, 1)"
                        : "rgba(175, 239, 235, 1)",
                  },
                ]}
              >
                <View
                  style={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    marginLeft: "2%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: "70%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 50,
                        backgroundColor: item.backgroundColor,
                      }}
                    >
                      <Image
                        style={styles.image}
                        source={require("../../assets/antz.png")}
                        resizeMode="stretch"
                      />
                    </View>
                    <View
                      style={{ marginLeft: "8%", justifyContent: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "600",
                          textAlign: "center",
                          color: "rgba(68, 84, 74, 1)",
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </View>

                  {item.id == itmid ? (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        paddingRight: "3%",
                      }}
                    >
                      <AntDesign
                        name="check"
                        size={24}
                        color="rgba(31, 81, 91, 1)"
                      />
                    </View>
                  ) : (
                    ""
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={{}}>
        <Footermedical
          ShowIonicons={true}
          firstlabel={"Select Animal"}
          lastlabel={"Complaints"}
          navigateNextScreen={navigateNextScreen}
          navigatePreviousScreen={navigatePreviousScreen}
        />
      </View>
    </>
  );
};

export default CaseType;

const styles = StyleSheet.create({
  cont: {
    borderRadius: widthPercentageToDP("2%"),
    marginVertical: widthPercentageToDP("2%"),
    marginHorizontal: widthPercentageToDP("2"),
    // elevation: 2, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: "2%",
    borderWidth: 1,
    borderColor: "rgba(195, 206, 199, 1)",
  },
  image: {
    width: 34,
    height: 34,
    alignSelf: "center",
    alignItems: "center",
    marginTop: "24%",
    borderWidth: 1,
  },

  image11: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "rgba(242, 255, 248, 1)",
    alignItems: "center",
    paddingTop: "3%",
    marginRight: "3%",
  },
});
