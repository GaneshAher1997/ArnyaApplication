// created by : Gaurav Shukla
// Created at  28/04/2023

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomForm from "../../components/CustomForm";
import Colors from "../../configs/Colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import AddMedicalRecordCard from "../../components/AddMedicalRecordCard";
import { useDispatch, useSelector } from "react-redux";
import { removeMedical } from "../../redux/MedicalSlice";

const AddMedical = () => {
  const dispatch = useDispatch();
  const [Show, setShow] = useState();
  const [DataCase, setDataCase] = useState("");
  const [idCase, setIdCase] = useState("");
  const [diagnosisData, setDiagnosisData] = useState([]);
  const navigation = useNavigation();
  const caseType = useSelector((state) => state.medical.caseType);
  const diagnosisDataSelector = useSelector((state) => state.medical.diagnosis);

  const CaseType = () => {
    navigation.navigate("CaseType");
  };

  const chooseAnimal = () => {
    navigation.navigate("Searchanimal");
  };

  const gotoComplaints = () => {
    navigation.navigate("Complaints");
  };

  const gotoDaignosis = () => {
    navigation.navigate("Diagnosis");
  };

  const gotoAdvice = () => {
    navigation.navigate("Advice");
  };
  const gotoPrescription = () => {
    navigation.navigate("Rx");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setAllData();
    });
    return unsubscribe;
  }, [navigation, caseType]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setDiagnosisData(diagnosisDataSelector);
    });
    return unsubscribe;
  }, [navigation, gotoDaignosis]);

  const setAllData = () => {
    setIdCase(caseType.id ?? "");
    setDataCase(caseType.title ?? "");
  };

  return (
    <>
      {Show == true ? (
        <>
          <CustomForm header={true} title={"Add Medical Record"}>
            <View>
              <View>
                <AddMedicalRecordCard
                  children={
                    <>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={styles.title}>Select Animals</Text>
                      </View>
                      <Text style={styles.subtitle}>Nanday Conure</Text>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={styles.subtitle}>A000093</Text>
                        <Text style={styles.MBox}>M</Text>
                        <Text style={styles.BBox}>B</Text>
                      </View>
                      <Text style={styles.subtitle}>
                        Enclosure Name,Section Name
                      </Text>
                    </>
                  }
                  imgPath={require("../../assets/antz.png")}
                  rightIcon={true}
                />
              </View>
            </View>

            <View>
              <AddMedicalRecordCard
                children={
                  <>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.title}>Complaints</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: wp(1.5),
                      }}
                    >
                      <Text style={styles.painbox}>Pain</Text>
                      <Text style={styles.RestLessness}>Restlessness</Text>
                      <Text style={styles.Bleeding}>Bleeding</Text>
                    </View>
                  </>
                }
                backgroundColor={"#37BD69"}
                image={true}
                imagePath={require("../../assets/antz.png")}
                rightIcon={true}
              />
            </View>

            <View>
              <AddMedicalRecordCard
                children={
                  <>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.title}>Lab Test Request</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: wp(1.5),
                      }}
                    >
                      <Text style={styles.painbox}>RBS</Text>
                      <Text style={styles.RestLessness}>Lipid Profile</Text>
                    </View>
                  </>
                }
                backgroundColor={"#37BD69"}
                imagePath={require("../../assets/antz.png")}
                image={true}
                rightIcon={true}
              />
            </View>
            <View>
              <AddMedicalRecordCard
                children={
                  <>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.title}>Prescription</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: wp(1.5),
                      }}
                    >
                      <Text style={styles.painbox}>Pantocid</Text>
                      <Text style={styles.RestLessness}>Omnacortil 1.5 mg</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: wp(1.5),
                      }}
                    >
                      <Text style={styles.painbox}>Perdmet 1% Eye Drop</Text>
                    </View>
                  </>
                }
                backgroundColor={"#37BD69"}
                image={true}
                imagePath={require("../../assets/antz.png")}
                rightIcon={true}
              />
            </View>
            <View>
              <AddMedicalRecordCard
                title={"Follow Up Date"}
                children={
                  <>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.title}>Follow Up Date</Text>
                    </View>
                    <Text style={styles.subtitle}>28 April 2023</Text>
                  </>
                }
                backgroundColor={"#37BD69"}
                image={true}
                imagePath={require("../../assets/antz.png")}
                rightIcon={true}
              />
            </View>
            <View>
              <AddMedicalRecordCard
                children={
                  <>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.title}>Advice</Text>
                    </View>
                    <Text style={styles.subtitle}>------</Text>
                  </>
                }
                backgroundColor={"#37BD69"}
                image={true}
                imagePath={require("../../assets/antz.png")}
                rightIcon={true}
              />
            </View>
          </CustomForm>
        </>
      ) : (
        <CustomForm header={true} title={"Add Medical Record"}>
          <View>
            <AddMedicalRecordCard
              children={
                <>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.title}>Select Section,Encloure</Text>
                  </View>
                </>
              }
              onPress={() => chooseAnimal()}
              backgroundColor={"#D9D9D9"}
              image={true}
              imagePath={require("../../assets/antz.png")}
              rightIcon={true}
            />
          </View>
          {DataCase != "" ? (
            <View>
              <AddMedicalRecordCard
                children={
                  <>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.title}>Case Type</Text>
                    </View>
                    <Text style={styles.subtitle}>{DataCase}</Text>
                  </>
                }
                image={true}
                onPress={() => CaseType()}
                imagePath={require("../../assets/antz.png")}
                backgroundColor={"#FA6140"}
                rightIcon={true}
              />
            </View>
          ) : (
            <View>
              <AddMedicalRecordCard
                children={
                  <>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.title}>Case Type</Text>
                    </View>
                  </>
                }
                backgroundColor={"#D9D9D9"}
                onPress={() => CaseType()}
                image={true}
                imagePath={require("../../assets/antz.png")}
                rightIcon={true}
              />
            </View>
          )}

          <View>
            <AddMedicalRecordCard
              children={
                <>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.title}>Complaints</Text>
                  </View>
                </>
              }
              backgroundColor={"#D9D9D9"}
              onPress={() => gotoComplaints()}
              image={true}
              imagePath={require("../../assets/antz.png")}
              rightIcon={true}
            />
          </View>
          {diagnosisData != "" ? (
            <View>
              <AddMedicalRecordCard
                children={
                  <>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.title}>Daignosis</Text>
                    </View>

                  
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          margin: wp(1.5),
                        }}
                      >
                   
                        {diagnosisData.map((item) => {
                          return (
                            <View>
                              <Text
                                style={[
                                  styles.painbox,
                                  { backgroundColor: "#FFD3D3" },
                                ]}
                              >
                                {item.name}
                              </Text>
                            </View>
                          );
                        })}
           
                      </View>
                  </>
                }
                backgroundColor={"#37BD69"}
                image={true}
                onPress={() => gotoDaignosis()}
                imagePath={require("../../assets/antz.png")}
                rightIcon={true}
              />
            </View>
          ) : (
            <View>
              <AddMedicalRecordCard
                children={
                  <>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.title}>Daignosis</Text>
                    </View>
                  </>
                }
                backgroundColor={"#D9D9D9"}
                onPress={() => gotoDaignosis()}
                image={true}
                imagePath={require("../../assets/antz.png")}
                rightIcon={true}
              />
            </View>
          )}

          <View>
            <AddMedicalRecordCard
              children={
                <>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.title}>Lab Test Request</Text>
                  </View>
                </>
              }
              backgroundColor={"#D9D9D9"}
              image={true}
              imagePath={require("../../assets/antz.png")}
              rightIcon={true} 
            />
          </View>
          <View>
            <AddMedicalRecordCard
              children={
                <>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.title}>Prescription</Text>
                  </View>
                </>
              }
              backgroundColor={"#D9D9D9"}
              onPress={() => gotoPrescription()}
              image={true}
              imagePath={require("../../assets/antz.png")}
              rightIcon={true}
            />
          </View>
          <View>
            <AddMedicalRecordCard
              children={
                <>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.title}>Follow Up Date</Text>
                  </View>
                </>
              }
              backgroundColor={"#D9D9D9"}
              image={true}
              imagePath={require("../../assets/antz.png")}
              rightIcon={true}
            />
          </View>
          <View>
            <AddMedicalRecordCard
              children={
                <>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.title}>Advice</Text>
                  </View>
                </>
              }
              image={true}
              onPress={() => gotoAdvice()}
              imagePath={require("../../assets/antz.png")}
              backgroundColor={"#D9D9D9"}
              rightIcon={true}
            />
          </View>
          <View>
            <AddMedicalRecordCard
              children={
                <>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.title}>Health Status</Text>
                  </View>
                </>
              }
              image={true}
              imagePath={require("../../assets/antz.png")}
              backgroundColor={"#D9D9D9"}
              rightIcon={true}
            />
          </View>
          <View>
            <AddMedicalRecordCard
              children={
                <>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={styles.title}>Notes</Text>
                  </View>
                </>
              }
              image={true}
              imagePath={require("../../assets/antz.png")}
              backgroundColor={"#D9D9D9"}
              rightIcon={true}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(removeMedical());
              setIdCase("");
              setDataCase("");
            }}
            style={{
              width: "100%",
              alignSelf: "center",
              marginTop: 10,
              borderWidth: 1,
              borderColor: "red",
              height: 45,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                padding: 10,
                fontSize: 15,
                color: "red",
              }}
            >
              Delete Medical Record
            </Text>
          </TouchableOpacity>
        </CustomForm>
      )}
    </>
  );
};
export default AddMedical;

const styles = StyleSheet.create({
  title: {
    fontSize: wp(4.8),
    fontWeight: "300",
    color: Colors.subtitle,
    // backgroundColor:'yellow',
    width: "100%",
  },
  subtitle: {
    fontSize: wp(4.5),
    color: Colors.subtitle,
    fontWeight: "600",
    fontStyle: "italic",
  },
  painbox: {
    borderWidth: 0.5,
    padding: wp(2),
    marginLeft: wp(1),
    paddingTop: wp(0.5),
    height: hp(3.8),
    borderRadius: 2,
    borderColor: "grey",
    fontSize: wp(4.5),
    fontWeight: "600",
    fontStyle: "italic",
    color: Colors.subtitle,
    backgroundColor: "#AFEFEB",
  },
  RestLessness: {
    borderWidth: 0.5,
    padding: wp(1),
    paddingTop: wp(0.5),
    height: hp(3.8),
    marginLeft: wp(1),
    borderRadius: 2,
    borderColor: "grey",
    fontSize: wp(4.5),
    fontWeight: "600",
    fontStyle: "italic",
    color: Colors.subtitle,
    backgroundColor: "#AFEFEB",
  },
  Bleeding: {
    borderWidth: 0.5,
    padding: wp(1),
    paddingTop: wp(0.5),
    height: hp(3.8),
    marginLeft: wp(1),
    borderRadius: 2,
    borderColor: "grey",
    fontSize: wp(4.5),
    fontWeight: "600",
    fontStyle: "italic",
    color: Colors.subtitle,
    backgroundColor: "#AFEFEB",
  },
  MBox: {
    //  borderWidth:0.5,
    marginLeft: wp(1),
    paddingTop: wp(0.3),
    padding: wp(1),
    height: hp(3),
    backgroundColor: "#DAE7DF",
  },
  BBox: {
    //  borderWidth:0.5,
    marginLeft: wp(1),
    paddingTop: wp(0.3),
    padding: wp(1),
    height: hp(2.9),
    backgroundColor: "#00D6C9",
  },
  Namebox: {
    borderWidth: 0.5,
    padding: wp(2),
    paddingTop: wp(0.5),
    height: hp(3.8),
    borderRadius: 2,
    borderColor: "grey",
    fontSize: wp(4.5),
    fontWeight: "600",
    fontStyle: "italic",
    color: Colors.subtitle,
    // backgroundColor: "#AFEFEB",
  },
});