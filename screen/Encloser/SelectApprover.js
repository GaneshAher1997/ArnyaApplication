// Created By: Asutosh Raj
// Created At: 11/05/2023
// modified by Wasim Akram  at 12/05/2023 
// description : fixed design as per figma 




import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import SearchAnimalHeader from "../../components/SearchAnimalHeader";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Colors from "../../configs/Colors";
import AddMedicalRecordCard from "../../components/AddMedicalRecordCard";
import { useNavigation } from "@react-navigation/native";

const arr = [
    {
      id: 1,
      title: "Taranjeet Singh",
      title_id: "Supervisor",
      sex_data: "Housing",
    },
    {
      id: 2,
      title: "Taranjeet Singh",
      title_id: "Supervisor",
      sex_data: "Housing",
    },
    {
      id: 3,
      title: "Taranjeet Singh",
      title_id: "Supervisor",
      sex_data: "Housing",
    },
    {
      id: 4,
      title: "Taranjeet Singh",
      title_id: "Supervisor",
      sex_data: "Housing",
    },
    {
      id: 5,
      title: "Taranjeet Singh",
      title_id: "Supervisor",
      sex_data: "Housing",
    },
    {
      id: 6,
      title: "Taranjeet Singh",
      title_id: "Supervisor",
      sex_data: "Housing",
    },
    {
        id: 7,
        title: "Taranjeet Singh",
        title_id: "Supervisor",
        sex_data: "Housing",
      },
      {
        id: 8,
        title: "Taranjeet Singh",
        title_id: "Supervisor",
        sex_data: "Housing",
      },
      {
        id: 9,
        title: "Taranjeet Singh",
        title_id: "Supervisor",
        sex_data: "Housing",
      },
      {
        id: 19,
        title: "Taranjeet Singh",
        title_id: "Supervisor",
        sex_data: "Housing",
      },
      {
        id: 29,
        title: "Taranjeet Singh",
        title_id: "Supervisor",
        sex_data: "Housing",
      },
      {
        id: 91,
        title: "Taranjeet Singh",
        title_id: "Supervisor",
        sex_data: "Housing",
      },
  ];

const SelectApprover = () => {
  const navigation = useNavigation();

 
  const [deptDataValue, setDeptDataValue] = useState("");
  const [departmentData, setDepartmentData] = useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ]);
  const [superVisorValue,setSuperVisorValue] = useState("");
  const [superVisorData,setSuperVisorData] = useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ])

  const gotoBackPage = () => navigation.goBack();
  return (
    <>
      <SearchAnimalHeader label="Search people" 
      onPressFirst={gotoBackPage}
      />
      <View style={styles.container}>
        <View style={styles.searchbox}>
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
              {" "}
              Filter by
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginHorizontal: widthPercentageToDP(10),
              alignItems: "flex-start",
              left:0
              
              
            }}
          >
            <View>
              <Dropdown
                style={styles.collectionsDropdown}
                placeholderStyle={styles.placehStyle}
                selectedTextStyle={styles.itemstyle}
                data={departmentData}
                labelField="label"
                valueField="value"
                placeholder="Departments"
                searchPlaceholder="Search..."
                value={deptDataValue}
                onChange={(item) => setDeptDataValue(item.value)}
              />
            </View>
            <View>
              <Dropdown
                style={styles.collectionsDropdown}
                placeholderStyle={styles.placehStyle}
                selectedTextStyle={styles.itemstyle}
                data={superVisorData}
                labelField="label"
                valueField="value"
                placeholder="Supervisor"
                searchPlaceholder="Search..."
                value={superVisorValue}
                onChange={(item) => setSuperVisorData(item.value)}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                color: "#44544A",
                marginLeft: widthPercentageToDP(5),
                marginTop: "5%",
              }}
            >
              Results
            </Text>
          </View>
          <View style={{ marginHorizontal: 10 ,paddingBottom:heightPercentageToDP(4)}}>
              <FlatList
                data={arr}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <>
                      <AddMedicalRecordCard
                        backgroundColorimg={"red"}
                        backgroundColor={"white"}
                        children={
                          <>
                            <Text style={styles.subtitle}>{item.title}</Text>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <Text style={styles.subtitle}>
                                {item.title_id}
                              </Text>
                            
                            </View>
                            <Text style={styles.subtitle1}>
                              Department - {item.sex_data}
                            </Text>
                          </>
                        }
                        imgPath={require("../../assets/antz.png")}
                      />
                    </>
                  );
                }}
              />
            </View>
        </View>
      </View>
    </>
  );
};

export default SelectApprover;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "rgba(218, 231, 223, 1)",
  },
  Searchbar: {
    width: widthPercentageToDP(100),
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
  },
  collectionsDropdown: {
    width: widthPercentageToDP(38),
    height: heightPercentageToDP(5),
    borderColor: Colors.boxBorderColor,
    borderWidth: widthPercentageToDP(0.3),
    borderRadius: 8,
    marginRight: widthPercentageToDP(6),
    backgroundColor: "white",
  },
  placehStyle: {
    color: "rgba(31, 81, 91, 1)",
    paddingLeft: widthPercentageToDP(4),
  },
  subtitle: {
    fontSize: widthPercentageToDP(4.5),
    color: Colors.subtitle,
    fontWeight: "600",
    // fontStyle: "italic",
    padding: heightPercentageToDP(0.3),
  },
  subtitle1: {
    fontSize: widthPercentageToDP(3.6),
    color: "rgba(68, 84, 74, 1)",
    fontWeight: "600",
    // fontStyle: "italic",
    padding: heightPercentageToDP(0.3),
  },
  itemstyle:{
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  }
});
