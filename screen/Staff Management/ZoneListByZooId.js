import { View, Text, StyleSheet, FlatList, Platform, Linking } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import { PostZoneListByZooIdService } from '../../services/CreateZoneService';
import CustomForm from '../../components/CustomForm'
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';

import { Ionicons } from '@expo/vector-icons';
import InputBox from "../../components/InputBox";
import Category from "../../components/DropDownBox";
import { useSelector } from "react-redux";





const ZoneListByZooId = (props) => {
  const navigation = useNavigation()
  const [zooName, setZooName] = useState("");
  const [setDropDown, setSetDropDown] = useState("");
  const [id, setId] = useState();
  const [isLoading, setLoding] = useState(false);
  const zoo = useSelector((state) => state.UserAuth.zoos);
  const [resData, setResData] = useState([]);
  const [sectionData, setSectionData] = useState([]);

  const catPressed = (item) => {
    setZooName(item.map((u) => u.name).join(", "));
    setId(item.map((id) => id.id).join(','));
    setSetDropDown(!setDropDown)
    setLoding(true)
    let obj = { zoo_id: item[0].id }
    PostZoneListByZooIdService(obj)
      .then((res) => {
        console.log("*************************", res)
        setResData(res.data);
        console.log('ok');
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoding(false);
    })
  }

  useEffect(() => {
    let getdata = zoo.map((item) => {
      return {
        id: item.zoo_id,
        name: item.zoo_name
      }
    })
    setSectionData(getdata)
  }, [])

  const navigate=()=>{
       navigation.goBack();
       alert("Done!")
  }

  const openMap = (lat, lng) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
  }

  const SetDropDown = (data) => {
    setSetDropDown(data);
  }

  const renderItem = (item) => {
    console.log(item);
    const {
      zone_id,
      zone_site_id,
      zone_name,
      zone_description,
      zone_incharge,
      zone_incharge_number,
      created_at,
      zone_latitude,
      zone_longitude,
      modified_at } = item.item;
    console.log("zzzzzzzzzzz", item.item.zone_id)
    return (
      <>
        <View style={[styles.listContainer, styles.shadow]}>
          <View style={styles.header}>
            <View style={styles.innerHeader}>
              <Text>ID : </Text>
              <Text style={styles.idNumber}>{`#${zone_id}`}</Text>
            </View>
            <Ionicons onPress={() => openMap(zone_latitude, zone_longitude)} name="navigate" size={24} color="#00abf0" />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Site Id :</Text>
            <Text style={styles.idNumber}>{zone_site_id}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Name :</Text>
            <Text style={styles.idNumber}>{zone_name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Longitude :</Text>
            <Text style={styles.idNumber}>{zone_longitude}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Latitude :</Text>
            <Text style={styles.idNumber}>{zone_latitude}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Incharge : </Text>
            <Text style={styles.idNumber}>{zone_incharge}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Incharge Number : </Text>
            <Text style={styles.idNumber}>{zone_incharge_number}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Description : </Text>
            <Text style={styles.idNumber}>{zone_description}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Created at : </Text>
            <Text style={styles.idNumber}>{created_at}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Modified_at : </Text>
            <Text style={styles.idNumber}>{modified_at}</Text>
          </View>

        </View>


      </>
    )
  }

  return (
    <>
      {isLoading ? <Loader /> :
        <CustomForm title="ZoneList By Zoo ID" header={true}  onPress={navigate}>  
          <InputBox
            editable={false}
            inputLabel="Zoo Name"
            value={zooName}
            placeholder="Enter Zoo Name"
            rightElement="chevron-down"
            DropDown={SetDropDown}
          />
          <View style={styles.listSection} >
            <FlatList
              data={resData}
              ListEmptyComponent={<Text style={{ textAlign: 'center', color: 'tomato' }}>...No Data Found...</Text>}
              renderItem={item => renderItem(item)}
              keyExtractor={resData.zoo_id}
              showsVerticalScrollIndicator={false}
            />
          </View>

        </CustomForm>}
      {setDropDown ? (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Category
            categoryData={sectionData}
            onCatPress={catPressed}
            heading={"Choose Section"}
            userType={"admin"}
            navigation={props.navigation}
            permission={"Yes"}
            screen={"AddCategory"}
            isMulti={false}
          />
        </View>
      ) : null}
    </>
  )
}



export default ZoneListByZooId;

const styles = StyleSheet.create({
  Label: {
    marginTop: 20,
    fontSize: 5,
    fontWeight: "200",
  },
  errortext: {
    color: "red"

  },
  listSection: {
    marginVertical: 10,
    backgroundColor: 'red',
    // flex:1,

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    paddingTop: 12
  },
  titleSection: {
    marginTop: 14,
    alignSelf: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: '#000',
    lineHeight: 22
  },
  listSection: {
    // backgroundColor:'#ffe',
    flex: 1,
    marginTop: 15
  },
  listContainer: {
    backgroundColor: '#ccc',
    marginVertical: 5,
    borderRadius: 8,
    padding: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  innerHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  idNumber: {
    marginLeft: 5,
    fontWeight: '500'
  },
  shadow: {
    shadowOffset: {
      height: 10,
      width: 5
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 1,
    // backgroundColor:'rgba(0,0,0,0.2)'
  }
})


{/* <FormControl isInvalid={isError.inputValue}>
            <FormControl.Label
              _text={{ fontWeight: "400" }}
              style={styles.Label}
            >
              Zoo Name
            </FormControl.Label>
            <Select
              selectedValue={inputValue}
              minWidth="200"
              accessibilityLabel="Choose Zoo Name"
              placeholder={label ? { label } : "Enter Zoo Name"}
              mt={1}
              onValueChange={(itemValue) => {
                onSubmit(itemValue)

              }}

            >
              {
                zoo.map((item, index) => {
                  return (
                    <Select.Item key={index.toString()} label={item.zoo_name} value={item.zoo_id} />
                  )
                })
              }
            </Select>
            {
              isError.inputValue
                ? (
                  <Text style={styles.errortext}>{errorMessage.inputValue}</Text>
                )
                : null
            }
          </FormControl> */}