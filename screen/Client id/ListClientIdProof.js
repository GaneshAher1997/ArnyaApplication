import { View, Text, StyleSheet ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { listIdProof } from '../../services/ClientService'
import ListComponent from '../../components/ListComponent';
import Loader from '../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import FloatingButton from "../../components/FloatingButton";
import Header from '../../components/Header';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const ListClientIdProof = () => {
  const navigation = useNavigation()

  const [clientIdProof, setClientIdProof] = useState([])
  const [isLoading, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true)
    listIdProof().then((res) => {
      // console.log(res);

      setClientIdProof(res)

      // return res;
    }).finally(() => {
      setIsLoding(false)
    })

  }, [])

  // console.log('client data====>', clientIdProof.length);



  const InnerList = ({ item }) => {
    console.log('inner list=======>', item);
    const { id, client_id, created_at, created_by, id_name, modified_at, required, status, string_id } = item.item
    return (
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <View style={styles.innerHeader}>
            <Text>ID:</Text>
            <Text style={styles.idNumber}>{`#${id}`}</Text>
          </View>
          <Text style={styles.idNumber}>{status}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Client ID Type:</Text>
          <Text style={styles.idNumber}>{id_name}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>String Id:</Text>
          <Text style={styles.idNumber}>{string_id}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>required:</Text>
          <Text style={styles.idNumber}>{required}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Client Id</Text>
          <Text style={styles.idNumber}>{client_id}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Created by</Text>
          <Text style={styles.idNumber}>{created_by}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Created at:</Text>
          <Text style={styles.idNumber}>{created_at}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Modified at:</Text>
          <Text style={styles.idNumber}>{modified_at}</Text>
        </View>
      </View>
    )
  }




  return (
    <View style={{ flex: 1 }}>
      <Header noIcon={true} title={'Id Proof Type'} />
      <View style={{ flex: 1 }}>

        {
          isLoading ? <Loader /> :

            <View style={styles.container}>

              <FlatList
                data={clientIdProof}
                renderItem={item => <ListComponent item={item} onPress={() => navigation.navigate('GetClientidProof', { itemId: item.item.id })} >
                  <InnerList item={item} />
                </ListComponent>}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />

              <FloatingButton
               icon="plus-circle-outline"
                backgroundColor="#eeeeee"
                borderWidth={0}
                borderColor="#aaaaaa"
                borderRadius={50}
                linkTo=""
                floaterStyle={{ height: 60, width: 60 }}
                onPress={() => navigation.navigate("ClientIdproof")}
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
    // padding: 10
    paddingHorizontal:10,
    marginBottom:heightPercentageToDP(6)
  },
  header: {
    flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
  },
  innerHeader: {
    flexDirection:'row',
    alignItems:'center'
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
  },




})

export default ListClientIdProof;