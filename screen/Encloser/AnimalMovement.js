// created By: Wasim Akram
// created at: 10/05/2023

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import MoveAnimalHeader from "../../components/MoveAnimalHeader";
import { TextInput } from "react-native-paper";

const AnimalMovement = (props) => {
  const navigation = useNavigation();

  const [isentityMenuOpen, setIsentityMenuOpen] = useState(false);
  const [entity, setentity] = useState(props.route.params?.item?.data ?? "");
  const [entityData, setentityData] = useState([]);
  const [entityId, setentityId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  const [istoEnclosureMenuOpen, setIstoEnclosureMenuOpen] = useState(false);

  const [toEnclosureId, settoEnclosureId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  const [userData, setuserData] = useState([]);
  const [approveFromId, setapproveFromId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  const [reason, setreason] = useState("");

  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const user = useSelector((state) => state.UserAuth.userDetails);

  const gotoSelectScreen = () => {
    navigation.navigate("SearchTransferanimal");
  };
  const gotoSearchScreen = () => {
    navigation.navigate("MoveAnimalSearch");
  };
  const gotoApprovalScreen = () => {
    navigation.navigate("SelectApprover");
  };

  return (
    <>
      <MoveAnimalHeader
        title={"Move Animal"}
        headerTitle={styles.headerTitle}
      />
      <View style={styles.conatiner}>
        <View style={styles.animalBox}>
          {/* <View style={styles.animalCardStyle}> */}
            <TouchableOpacity onPress={gotoSearchScreen} 
              style={styles.animalCardStyle}>
              <Text style={styles.animalTextStyle}>
                Select Animal to be moved
              </Text>
            </TouchableOpacity>
          {/* </View> */}
        </View>

        <View style={styles.destinationBox}>
          {/* <View style={styles.animalCardStyle}> */}
            <TouchableOpacity onPress={gotoSelectScreen} 
            style={styles.animalCardStyle}
            >
              <Text style={styles.animalTextStyle}>Select Desination</Text>
            </TouchableOpacity>
          {/* </View> */}
        </View>

        <View style={styles.destinationBox}>
          {/* <View style={styles.animalCardStyle}> */}
            <TouchableOpacity onPress={gotoApprovalScreen} 
            style={styles.animalCardStyle}
            >
              <Text style={styles.animalTextStyle}>Approval Form</Text>
            </TouchableOpacity>
          {/* </View> */}
        </View>
        <View style={styles.destinationBox}>
          <View style={styles.reasonToMoveBox}>
            <Text style={styles.animalTextStyle}>Reason to Move</Text>
            <TextInput
              style={styles.inputbox}
              mode="outlined"
              placeholder="Enter Reason to Move"
              outlineStyle={{ borderRadius: 7, backgroundColor: "#FFFACF" }}
            />
          </View>
        </View>

        <View style={styles.destinationBox}>
          {/* <View style={styles.animalCardStyle}> */}
            <TouchableOpacity onPress={()=>console.log("hello three musketers")} 
            style={styles.animalCardStyle}
            >
              <Text style={styles.animalTextStyle}>Requested by</Text>
            </TouchableOpacity>
          </View>
        {/* </View> */}
      </View>
    </>
  );
};

export default AnimalMovement;
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  animalBox: {
    marginTop: heightPercentageToDP(4),
    width: widthPercentageToDP(90),
  },
  destinationBox: {
    marginTop: heightPercentageToDP(2),
    width: widthPercentageToDP(90),
  },
  animalText: {
    fontSize: 15,
    fontWeight: "500",
    color: "black",
    paddingLeft: widthPercentageToDP(2),
  },

  animalCardStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: widthPercentageToDP(90),
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: "#C3CEC7",
    height: heightPercentageToDP(7),
    backgroundColor: "#F2FFF8",
  },
  reasonToMoveBox: {
    justifyContent: "center",
    // alignItems: "center",
    width: widthPercentageToDP(90),
    borderWidth: 0.5,
    borderColor:"#C3CEC7",
    borderRadius: 6,
    height: heightPercentageToDP(13),
    backgroundColor: "#F2FFF8",
  },

  animalTextStyle: {
    fontSize: widthPercentageToDP(4.5),
    fontWeight: "600",
    color: "#006D35",
    paddingLeft: widthPercentageToDP(5),
  },
  headerTitle: {
    fontSize: 24,
    color: "#1A1C1E",
    paddingLeft: widthPercentageToDP(20),
  },
  inputbox: {
    width: widthPercentageToDP(80),
    alignSelf: "center",
    // borderRadius:widthPercentageToDP("3%")
  },
});
