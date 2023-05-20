import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
const DATA = [
  {
    id: "1",
    title: "ADD DESIGNATION ",
    screen: "CreateDesignation",
  },
  {
    id: "2",
    title: "ADD DEPARTMENT",
    screen: "empDepartment",
  },
  {
    id: "3",
    title: "ADD ID PROOFS",
    screen: "ClientIdproof",
  },
  {
    id: "4",
    title: "EDUCATION TYPE",
    screen: "Education",
  },
  // {
  //   id: "6",
  //   title: "ADD FEED LOG",
  //   screen: "AddFeedLog",
  // },
  // {
  //   id: "7",
  //   title: "EGGS",
  //   screen: "EggLists",
  // },
  {
    id: "8",
    title: "ANIMAL MOVEMENT",
    screen: "AnimalMovement",
  },
  {
    id: "9",
    title: "ADD MEDICAL RECORD",
    screen: "AddMedical",
  },
];

const Item = ({ title, screen }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate(`${screen}`)}
      style={styles.item}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Master() {
  const renderItem = ({ item }) => (
    <Item title={item.title} screen={item.screen} />
  );
  return (
    <>
      <Header title="Masters" noIcon={true} />
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
    flex: 1,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5
  },
});
