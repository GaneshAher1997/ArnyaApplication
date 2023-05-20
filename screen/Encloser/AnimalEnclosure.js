// Created by Ashutosh Raj ---> 25-04-023

import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Header from "../../components/Header";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { useEffect } from "react";
import { postAnimalEnclosure } from "../../services/AnimalEnclosureService";
import { useState } from "react";
import CustomCard from "../../components/CustomCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Loader from "../../components/Loader";

const AnimalEnclosure = () => {
  const [animalData, setAnimalData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const route = useRoute();

  useEffect(() => {
    setLoading(true);
    postAnimalEnclosure({
      enclosure_id: route.params.item?.enclosure_id,
    })
      .then((res) => {
        console.log("THIS IS RESPONSE......", res.data);
        setAnimalData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // console.log("THIS IS DATA", animalData.data)

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header
          title="Animal in Enclosure"
          noIcon={true}
          style={{
            paddingBottom: widthPercentageToDP("3%"),
            paddingTop: widthPercentageToDP("2%"),
          }}
        />
        {Loading ? (
          <Loader visible={Loading} />
        ) : (
          <ScrollView
            style={{ backgroundColor: "#DAE7DF" }}
            showsVerticalScrollIndicator={false}
          >
            {animalData.length > 0 ? (
              <>
                {animalData.map((item) => {
                  return (
                    <View style={{ marginHorizontal: 14 }}>
                      <CustomCard
                        title={item.complete_name}
                        onPress={() =>
                          navigation.navigate("AnimalsDetails", {
                            animal_id: item.animal_id,
                          })
                        }
                        chips={
                          <View style={styles.tagMainCont}>
                            <View
                              style={
                                item.sex == "male"
                                  ? [
                                      styles.tagsContainer,
                                      { backgroundColor: "#DAE7DF" },
                                    ]
                                  : item.sex == "female"
                                  ? [
                                      styles.tagsContainer,
                                      { backgroundColor: "#00D6C9" },
                                    ]
                                  : {}
                              }
                              onStartShouldSetResponder={() => true}
                            >
                              <View
                                styles={
                                  item.sex == "male"
                                    ? styles.malechipM
                                    : item.sex == "female"
                                    ? styles.femalechipF
                                    : {}
                                }
                              >
                                <Text
                                  style={
                                    item.sex == "male"
                                      ? styles.malechipText
                                      : item.sex == "female"
                                      ? styles.femalechipText
                                      : {}
                                  }
                                >
                                  {item.sex == "male"
                                    ? `M`
                                    : item.sex == "female"
                                    ? `F`
                                    : null}
                                </Text>
                              </View>
                            </View>
                          </View>
                        }
                        subtitle={
                          "Animal Id: " +
                          item.animal_id +
                          "\n" +
                          "Enclosure Id: " +
                          item.enclosure_id
                        }
                        rightIcon={
                          <View
                            style={{
                              marginHorizontal: widthPercentageToDP(10),
                              marginVertical: widthPercentageToDP(6.5),
                            }}
                          >
                            <AntDesign name="right" size={14} color="black" />
                          </View>
                        }
                      />
                    </View>
                  );
                })}
              </>
            ) : (
              <>
                <View style={styles.noData}>
                  <Text>No Data</Text>
                </View>
              </>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

export default AnimalEnclosure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: "14%",
  },
  noData: {
    height: heightPercentageToDP(94),
    justifyContent: "center",
    alignItems: "center",
  },
  tagMainCont: {
    marginLeft: 3
    // paddingTop: "4%",
    // backgroundColor:"red",
    // borderWidth:2
  },
  tagsContainer: {
    flexDirection: "row",
    // backgroundColor: "#DAE7DF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 5,
    fontWeight: 500,
    // borderWidth:1
  },

  malechipM: {
    backgroundColor: "#DAE7DF",
    // backgroundColor:"red",
    // backgroundColor: "black",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 5,
    fontWeight: 700,
    // borderWidth:1
  },
  femalechipF: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#00D6C9",
    fontWeight: 500,
    marginLeft: 5,
  },
  malechipText: {
    fontSize: 15,
    // backgroundColor: "#00D6C9",
    color: "#1F515B",
    // color: "red",
  },
  femalechipText: {
    fontSize: 15,
    color: "#1F515B",
  },
});
