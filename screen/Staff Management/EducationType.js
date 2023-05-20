import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {getEducationType} from '../../services/staffManagement/getEducationType';
import ListComponent from "../../components/ListComponent";
import { useNavigation } from "@react-navigation/native";
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';


const EducationType = () => {
    const navigation = useNavigation();
    const [educationTypeData, setEducationTypeData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        getEducationType().then((res) => {
            setEducationTypeData(res);
            setIsLoading(false)
        }).finally(()=>{
            setIsLoading(false)
        })
    }, [])

    const label = {
        id: "ID",
        eduType: "Education Type",
        clientId: "Client Id",
        createdBy: "Created by",
        createdAt: "Created At",
        modifiedAt: "Modified At" 
    }
    
    const filterEduType = (item) => {
        navigation.navigate("GetEducationType", { itemId: item?.item?.id });
    };

    return (
        <>
        {
            isLoading ? <Loader /> :
        
        <View style={styles.container}>
                <Header title={"Education Type"} noIcon = {true} />
                <View style={styles.listSection}>
                    <FlatList 
                        data={educationTypeData}
                        renderItem={item => <ListComponent item={item} label={label} onPress={() => filterEduType(item)} /> }
                        keyExtractor={educationTypeData.id}
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
                            onPress={()=>navigation.navigate("Education")}
                        />
                </View>
        </View>}
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
    },
    
})

export default EducationType;