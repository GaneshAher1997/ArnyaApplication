import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import { getEducationTypeDetails } from "../../services/staffManagement/educationTypeDetails";

const {width, height} = Dimensions.get('window');

const GetEducationType = ({ route }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  const { itemId } = route.params;

  useEffect(() => {
    setIsLoading(true);
    getEducationTypeDetails({ itemId: itemId })
      .then(res => {
        // console.log("RESPONSE FROM API : ", res);
        setData(res);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("ok");
      });
  }, []);

  //   const {
  //     client_id,
  //     id,
  //     type_name,
  //     status,
  //     created_by,
  //     created_at,
  //     modified_at,
  //   } = data?.details;

  // console.log("data======>", data);

  return (
    <View style={{flex:1}}>
      <Header noIcon={true} title={`Details`} />
      {isLoading ? (
        <Loader loaderSize={"lg"} />
      ) : (
        <View style={styles.container}>
          {!data.is_success ? (
            <View>
              <Text>No data Found</Text>
            </View>
          ) : (
            <View style={styles.innerContainer}>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>Id:</Text>
                <Text>{data.details.id}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>Type:</Text>
                <Text>{data.details.type_name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>Client:</Text>
                <Text>{data.details.client_id}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>Created at:</Text>
                <Text>{data.details.created_at}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>Created by:</Text>
                <Text>{data.details.created_by}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>Modified at:</Text>
                <Text>{data.details.modified_at}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{ marginHorizontal: 5 }}>Status:</Text>
                <Text>{data.details.status}</Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    backgroundColor: "rgba(100,100,100,0.2)",
    alignItems: "center",
    padding: 8,
    marginVertical: 20,
    marginHorizontal: 10,
    width: width*0.9,
    height: height*0.5,
    justifyContent:'space-evenly',
    borderRadius:12
  },
  row:{
    flexDirection: "row", 
    // backgroundColor:'red',
    width:width*0.8,
    justifyContent:'space-between',
    // marginHorizontal:20
  }
});

export default GetEducationType;
