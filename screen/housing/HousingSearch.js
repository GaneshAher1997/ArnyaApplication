// Created By: Mohit sharma
// created at: 08/05/2023

import { View, Text,ScrollView } from "react-native";
import React from "react";
import { Chip, Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Colors from "../../configs/Colors";
import { useNavigation } from "@react-navigation/native";
import HounsingCard from "../../components/housing/HounsingCard";
import DropDown from "react-native-paper-dropdown";
import { useState } from "react";

const HousingSearch = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [gender, setGender] = useState("");
  const [gender1, setGender1] = useState("");
  const [gender2, setGender2] = useState("");
  const navigation = useNavigation();
  const gotoBackPage = () => navigation.goBack();


  const genderList = [
    {
      label: "Male",
      value: "male",
    }
  ];
  return (
    <>
      <View style={[styles.container, { backgroundColor: "#DAE7DF" }]}>
        <View>
          <Searchbar
            placeholder={"Search sections, enclosures..."}
            inputStyle={styles.input}
            style={[styles.Searchbar, { backgroundColor: "#fff" }]}
            autoFocus={true}
            icon={({ size, color }) => (
              <Ionicons
                name="md-arrow-back"
                size={24}
                color
                style={{
                  color: "black",
                }}
                onPress={gotoBackPage}
              />
            )}
            right={() => (
              <>
                <Ionicons
                  name="close"
                  size={20}
                  color={"black"}
                  style={{ marginRight: 10 }}
                />
              </>
            )}
          />
        </View>
        <ScrollView showsHorizontalScrollIndicator="false">
        <View>
        <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#44544A",
              margin: "4%",
              marginTop: "3%",
              marginBottom: "3%",
            }}
          >
            Show All
          </Text>
          <View style={{flexDirection : "row",justifyContent : "space-around",marginHorizontal : 13}}>
            <View style={{width : "32%", }}>
          <DropDown
              label={"Enclosures"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={gender}
              setValue={setGender}
              list={genderList}
              
            />
            </View>
            <View style={{width : "31%"}}>
                <DropDown
              label={"Added"}
              mode={"outlined"}
              visible={showDropDown1}
              showDropDown={() => setShowDropDown1(true)}
              onDismiss={() => setShowDropDown1(false)}
              value={gender1}
              setValue={setGender1}
              list={genderList}
            />
              
            </View>
            <View style={{width : "31%"}}>
                <DropDown
              label={"In Charge"}
              mode={"outlined"}
              visible={showDropDown2}
              showDropDown={() => setShowDropDown2(true)}
              onDismiss={() => setShowDropDown2(false)}
              value={gender2}
              setValue={setGender2}
              list={genderList}
            />
          </View>
        </View>
        </View>
        
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#44544A",
              marginLeft: "4%",
              marginTop: "5%",
            }}
          >
            Results
          </Text>
          <HounsingCard
            title="MK002"
            incharge="Charchil"
            section="Mount Kailash"
            chip1="Occupants  20"
            chip2="Species 2"
          />
          <HounsingCard
            title="MK002"
            incharge="Charchil"
            section="Mount Kailash"
            chip1="Occupants  20"
            chip2="Species 2"
          />
          <HounsingCard
            title="MK002"
            incharge="Charchil"
            section="Mount Kailash"
            chip1="Occupants  20"
            chip2="Species 2"
          />
          <HounsingCard
            title="MK002"
            incharge="Charchil"
            section="Mount Kailash"
            chip1="Occupants  20"
            chip2="Species 2"
          />
          <HounsingCard
            title="MK002"
            incharge="Charchil"
            section="Mount Kailash"
            chip1="Occupants  20"
            chip2="Species 2"
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  Searchbar: {
    width: "100%",
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
  },
 
});
export default HousingSearch;
