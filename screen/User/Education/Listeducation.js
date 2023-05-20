import { View, Text, StyleSheet,FlatList } from 'react-native'
import React, {  useEffect, useState } from 'react'
import { deletetEducation, getEducation } from '../../../services/EducationService';
import ListComponent from '../../../components/ListComponent';
import Loader from '../../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import FloatingButton from "../../../components/FloatingButton";
import Header from '../../../components/Header';

import moment from 'moment';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Listeducation = (props) => {
  const navigation = useNavigation()
  const [educationDetails, setEducationDetails] = useState([])
  const [user_id, setuser_id] = useState(props.route.params?.item?.user_id ?? 0)
  const [isLoading, setIsLoding] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation])

  const getData = () => {
    setIsLoding(true)
    getEducation({ user_id }).then((res) => {
      setEducationDetails(res.data)
    }).finally(() => {
      setIsLoding(false)
      console.log("ok========++");
    })

  }

  const deleteApi = ({ item }) => {
    let obj = {
      id: item.education_id,
    }
    setIsLoding(true);
    deletetEducation(obj).then((res) => {
      if (!res.success) {
        alert("something went wrong");
      } else {
        alert(res.message);
      }

    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsLoding(false);

    });

  }
  // console.log('client data====>', clientIdProof.length);



  const InnerList = ({ item }) => {
    const { education_id, user_id, education_type, institution_name, year_of_passout, course, marks, created_at, modified_at } = item.item;
    return (
      <View style={{ flex: 1, }}>
        <View style={styles.header}>
          <View style={styles.innerHeader}>
            <Text>ID:</Text>
            <Text style={styles.idNumber}>{`#${education_id}`}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>user id:</Text>
          <Text style={styles.idNumber}>{user_id}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Education Type:</Text>
          <Text style={styles.idNumber}>{education_type}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Institution name : </Text>
          <Text style={styles.idNumber}>{institution_name}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Year of passout:</Text>
          <Text style={styles.idNumber}>{year_of_passout}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Course:</Text>
          <Text style={styles.idNumber}>{course}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>marks:</Text>
          <Text style={styles.idNumber}>{marks}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Created at:</Text>
          <Text style={styles.idNumber}>{moment(created_at).format("do MMM YY , LT")}</Text>
        </View>
      </View>
    )
  }




  return (
    <View style={{ flex: 1 }}>
      <Header noIcon={true} title={'User Education'} />
      <View style={{ flex: 1 }}>

        {
          isLoading ? <Loader /> :

            <View style={styles.container}>

              <FlatList
                data={educationDetails}
                renderItem={item => <ListComponent item={item}
                  onPressDelete={() => deleteApi(item)}
                  onPressEdit={() => navigation.navigate('CreateEducation', { item: item })}
                >
                  <InnerList item={item} />
                </ListComponent>}
                keyExtractor={item => item.id}
              />

              <FloatingButton
               icon="plus-circle-outline"
                backgroundColor="#eeeeee"
                borderWidth={0}
                borderColor="#aaaaaa"
                borderRadius={50}
                linkTo=""
                floaterStyle={{ height: 60, width: 60 }}
                onPress={() => navigation.navigate("CreateEducation", { item: {user_id} })}
              />
            </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    paddingHorizontal:10,
    marginBottom:heightPercentageToDP(4),
    backgroundColor: "#fff"
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
    marginLeft: 3,
    fontWeight: '500'
  },
  shadow: {
    shadowOffset: {
      height: 10,
      width: 5
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }




})

export default Listeducation;