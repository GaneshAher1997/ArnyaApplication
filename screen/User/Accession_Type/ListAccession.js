import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl} from "react-native";
import FloatingButton from '../../../components/FloatingButton';
import Loader from '../../../components/Loader';
import Header from '../../../components/Header';
import { useNavigation } from "@react-navigation/native";
import ListComponent from "../../../components/ListComponent";
import { listAccessionType } from "../../../services/AccessionService";


const ListAccession = () => {

    const [accessionData, setAccessionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getRefreshData();
        });
        return unsubscribe;
    }, [navigation])

    const getRefreshData = () => {
        setRefreshing(true)
        setIsLoading(true);
        listAccessionType().then((res) => {
            // console.log('res', res);
            setAccessionData(res.data)
        }).catch((err) => {
            console.log('error', err);
        }).finally(()=>{
            setRefreshing(false)
            setIsLoading(false)
        })
    }


    const InnerComponent = ({item}) => {
        const {accession_id, accession_key, accession_type, comment, created_at, string_id } = item.item;
        return ( 
            <View style={styles.innerContainer}>
                <View style={{flexDirection:'row'}}>
                    <Text>Accession Id: </Text>
                    <Text style={styles.idNumber}>{accession_id}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>Accession Key: </Text>
                    <Text style={styles.idNumber}>{accession_key}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>Accession type: </Text>
                    <Text style={styles.idNumber}>{accession_type}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>Comment: </Text>
                    <Text style={styles.idNumber}>{comment}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>Created At: </Text>
                    <Text style={styles.idNumber}>{created_at}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>String ID: </Text>
                    <Text style={styles.idNumber}>{string_id}</Text>
                </View>
            </View>
        )
    }

    const editAccession = ({item}) => {
        //  console.log('item=========>');
        // navigation.navigate('AddExperience', {item})
    }
    const deleteAccession = ({item}) => {
        //  console.log('item=========>');
        // navigation.navigate('AddExperience', {item})
    }

    return (
        <>
        {
            isLoading || refreshing ? <Loader loaderSize={'lg'} /> :
        
            <View style={styles.container}>
                <Header noIcon={true} title={'Accession Type'} />
                <View style={styles.listSection}>
                    <FlatList 
                        data={accessionData}
                        renderItem={(item) => <ListComponent item={item} onPressEdit={editAccession(item)} onPressDelete={deleteAccession} onPress={() => navigation.navigate('GetAccessionType', { id: item.item.accession_id })}><InnerComponent item={item} /></ListComponent>}
                        showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshData}/>}
                    />

                    <FloatingButton
                       icon="plus-circle-outline"
                        backgroundColor="#eeeeee"
                        borderWidth={0}
                        borderColor="#aaaaaa"
                        borderRadius={50}
                        linkTo=""
                        floaterStyle={{ height: 60, width: 60 }}
                        onPress={()=>navigation.navigate("AddAccessionType")}
                    />
                </View>
            </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:8,
        paddingBottom:8
    },
    listSection:{
        flex:1,
        // backgroundColor:'red'
    }
})

export default ListAccession;