import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import Header from "../../components/Header";
const DATA = [
    {
        id: "1",
        title: "ADD ANIMAL",
        screen: "AnimalAddDynamicForm",
      },
      {
        id: "2",
        title: "ADD EGGS",
        screen: "EggsAddForm",
      },
      {
        id: "3",
        title: "ADD OTHERS ANIMALS",
        screen: "AddAnimals",
      },
];

const Item = ({ title, screen }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <Text onPress={() => navigation.navigate(`${screen}`)}>{title}</Text>
    </View>
  );
};

export default function Accession() {
  const renderItem = ({ item }) => (
    <Item title={item.title} screen={item.screen} />
  );
  return (
    <>
      <Header title="Accession" noIcon={true} />
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
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
