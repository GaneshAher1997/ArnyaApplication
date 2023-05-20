import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from '../../../components/Header';
import { getExperience, deleteExperience } from "../../../services/ExperienceService";
import ListComponent from "../../../components/ListComponent";
import FloatingButton from '../../../components/FloatingButton';
import Loader from '../../../components/Loader';
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP } from "react-native-responsive-screen";


const GetExperience = (props) => {
    const user = props.route.params?.item;
    const [expData, setExpData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        setIsLoading(true);
        getExperience({"user_id": user.user_id}).then((res) => {
            console.log('res', res);
            setExpData(res.data)
        }).catch((err) => {
            console.log('error', err);
        }).finally(() => {
            setIsLoading(false)
        })
    }, [isDelete])


    const InnerComponent = ({ item }) => {
        const { experience_id, total_work_experience, modified_at, join_date, institution_name, institution_location, industry, end_date, designation, created_at } = item.item;
        return (
            <View>
                {/* <View style={{flexDirection:'row'}}>
                    <Text>Id:</Text>
                    <Text style={styles.idNumber}>#{experience_id}</Text>
                </View> */}
                <View style={{ flexDirection: 'row' }}>
                    <Text>Institute Name:</Text>
                    <Text style={styles.idNumber}>{institution_name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Institute Location:</Text>
                    <Text style={styles.idNumber}>{institution_location}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Work Exp.:</Text>
                    <Text style={styles.idNumber}>{total_work_experience}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Industry:</Text>
                    <Text style={styles.idNumber}>{industry}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Designation:</Text>
                    <Text style={styles.idNumber}>{designation}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Join Date:</Text>
                    <Text style={styles.idNumber}>{join_date}</Text>
                </View>
                {/* <View style={{ flexDirection: 'row' }}>
                    <Text>Create Date:</Text>
                    <Text style={styles.idNumber}>{created_at}</Text>
                </View> */}
                <View style={{ flexDirection: 'row' }}>
                    <Text>End Date:</Text>
                    <Text style={styles.idNumber}>{end_date}</Text>
                </View>
            </View>
        )
    }

    const editExperienceData = ({ item }) => {
        // console.log('item=========>', item);
        navigation.navigate('AddExperience', { item })
    }

    const deleteExperienceData = ({ item }) => {
        setIsLoading(true);
        let obj = {
            id: item.id,
        }
        deleteExperience(obj).then((res) => {
            if (!res.success) {
                alert("Something went wrong!!");
            } else {
                alert("Deleted Successfully");
                setIsDelete(true)
            }
        }).catch((err) => {
            console.log(err);
            alert("Something went wrong!!");
        }).finally(() => {
            setIsLoading(false);
        });

    }

    return (
        <>
            <Loader visible={isLoading} />
            <Header noIcon={true} title={'User Experience'} />
            <View style={styles.container}>
                <View style={styles.listSection}>
                    <FlatList
                        data={expData}
                        renderItem={(item) => <ListComponent item={item} onPressDelete={() => deleteExperienceData(item)} onPressEdit={() => editExperienceData(item)} ><InnerComponent item={item} /></ListComponent>}
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
                        onPress={() => navigation.navigate("AddExperience", { item: user })}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingBottom: 8
    },
    listSection: {
        flex: 1,
        marginBottom:heightPercentageToDP(4),
        // backgroundColor:'red'
    },
    idNumber: {
        marginLeft: 5,
        fontWeight: '500'
    },
})

export default GetExperience;