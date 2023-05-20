import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";
import { List, SegmentedButtons, Button } from "react-native-paper";
import Colors from "../../configs/Colors";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const ApprovalTaskCard = ({
  Status,
  Reason,
  RequestedBy,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={styles.cardContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.middleSection}>
            {title ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.title}>{title}</Text>
              </View>
            ) : null}

            {subtitle ? (
              <Text style={title ? styles.subtitle : styles.title}>
                {subtitle}
              </Text>
            ) : null}
          </View>

          <View style={styles.enclosure}>
            <Text style={styles.enclosureName}>{RequestedBy}</Text>
          </View>

          <View style={styles.enclosure}>
            <Text style={styles.enclosureName}>{Reason}</Text>
          </View>
          <View style={styles.enclosure}>
            <Text style={styles.enclosureName}>Status:{Status}</Text>
          </View>

          {Status == "Pending" ? (
            <View style={{ flexDirection: "row" }}>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "red",
                  width: "32%",
                  marginLeft: "5%",
                }}
                onPress={() => console.log("Rejected")}
              >
                Rejected
              </Button>

              <Button
                style={{
                  color: "white",
                  backgroundColor: "green",
                  width: "32%",
                  marginLeft: "5%",
                }}
                onPress={() => console.log("Approve")}
              >
                Approve
              </Button>
            </View>
          ) : (
            ""
          )}
        </View>
      </View>
    </View>
  );
};

const ApprovalData = [
  {
    id: "REQ000007",
    Animals: "A00006514,A6654465",
    RequestedBy: "Biswanath",
    Reason: "Testing Enclosure",
    Status: "Pending",
  },
  {
    id: "REQ000006",
    Animals: "A00006514,A6654465",
    RequestedBy: "Biswanath",
    Reason: "Testing Enclosure Change Enclosure",
    Status: "Rejected",
  },
  {
    id: "REQ000005",
    Animals: "A00006514,A6654465",
    RequestedBy: "Biswanath",
    Reason: "Testing",
    Status: "Rejected",
  },
  {
    id: "REQ000003",
    Animals: "A00006514,A6654465",
    RequestedBy: "Biswanath",
    Reason: "Testing  Purpose",
    Status: "Rejected",
  },
  {
    id: "REQ00000036",
    Animals: "A00006514,A6654465",
    RequestedBy: "Biswanath",
    Reason: "Testing  Purpose",
    Status: "Rejected",
  },
  {
    id: "REQ0000066",
    Animals: "A00006514,A6654465",
    RequestedBy: "Biswanath",
    Reason: "Testing Enclosure Change Enclosure",
    Status: "Rejected",
  },
  {
    id: "REQ0000065",
    Animals: "A00006514,A6654465",
    RequestedBy: "Biswanath",
    Reason: "Testing",
    Status: "Rejected",
  },
  {
    id: "REQ0000063",
    Animals: "A00006514,A6654465",
    RequestedBy: "Biswanath",
    Reason: "Testing  Purpose",
    Status: "Rejected",
  },
  {
    id: "REQ00000366",
    Animals: "A00006514,A6654465",
    RequestedBy: "Biswanath",
    Reason: "Testing  Purpose",
    Status: "Rejected",
  },
];

const ApprovalTask = () => {
  const [value, setValue] = useState("tasks");
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

  return (
    <SafeAreaView style={{flex : 1,}}>
      <Header title="Enclosure Approval" noIcon={true} />
      <View style={[styles.container,  { backgroundColor: isSwitchOn ? "#1F415B" : "#DAE7DF" }]}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "tasks",
            label: "Tasks",
            showSelectedCheck: true,
          },
          {
            value: "enclosure",
            label: "Enclosure",
            showSelectedCheck: true,
          },
        ]}
        style={styles.group}
      />
      <View style={{flex : 1}}>
        {/* ////////////////////////Enclosure Options//////////////////////////// */}
        <View
              style={{
                display: value === "enclosure" ? "flex" : "none",
                margin : 10
              }}
            >
          <List.Section>
         
              <List.Accordion title="Enclosure Options" id="1" expanded={true}  titleStyle={{ color: "black" }}>
                <FlatList
                  data={ApprovalData}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ApprovalTaskCard
                      title={"#" + item.id}
                      subtitle={"Animals : " + item.Animals}
                      RequestedBy={"RequestedBy : " + item.RequestedBy}
                      Reason={"Reason : " + item.Reason}
                      Status={item.Status}
                    />
                    
                    )}
                    style={{marginBottom : 50}}
                    />
                    
              </List.Accordion>
          
          </List.Section>
        </View>
        {/* ////////////////////////Tasks Options//////////////////////////// */}

        <View style={{flex : 1,margin : 10}}>
          <List.Section>
            <List.Accordion title="Tasks Options" id="1" expanded={true}  titleStyle={{ color: "black" }}>
                <FlatList
                  data={ApprovalData}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ApprovalTaskCard
                      title={"#" + item.id}
                      subtitle={"Animals : " + item.Animals}
                      RequestedBy={"RequestedBy : " + item.RequestedBy}
                      Reason={"Reason : " + item.Reason}
                      Status={item.Status}
                    />
                  )}
                />
            </List.Accordion>
          </List.Section>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default ApprovalTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom : 100
    // backgroundColor: "#fff",
  },
  group: {
    top: 15,
    margin: "2%",
  },
  enclosureName: {
    paddingLeft: 10,
    width: "100%",
    margin: "1%",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: widthPercentageToDP("2%"),
    marginVertical: widthPercentageToDP("1%"),
    elevation: 2, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  middleSection: {
    paddingLeft: 10,
    width: "100%",

    margin: "1%",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.subtitle,
    width: "100%",
  },
  subtitle: {
    fontSize: 13,
    color: Colors.subtitle,
    fontWeight: "400",
    width: "100%",
  },
});
