
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import Header from '../components/Header';
import styles from '../configs/Styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const data = [{
    id: 1,
    fullName: "Users",
    avatarUrl: "https://www.admitek.com/wp-content/uploads/2017/04/User.png",
    screen: "ListStaff"
}, {
    id: 2,
    fullName: "Sites",
    avatarUrl: "https://printablefreecoloring.com/drawing/animals/coloring-zoo-12643.jpg",
    screen: "ListSite"
}, {
    id: 3,
    fullName: "Sections",
    avatarUrl: "https://img.freepik.com/free-vector/different-kinds-bird-cartoon-illustration-set-tomtit-robin-starling-woodpecker-sparrow-sitting-tree-branch-isolated-white-background-winter-birds-concept_74855-24087.jpg?w=2000",
    screen: "Housing"
}, {
    id: 4,
    fullName: "Enclosures",
    avatarUrl: "https://a-z-animals.com/media/2022/06/Lovebirds-on-fence.jpg",
    screen: "EnclosureList"
},{
    id: 5,
    fullName: "Eggs",
    avatarUrl: "https://a-z-animals.com/media/2023/03/iStock-619400680.jpg",
    screen: "EggLists"
},{
    id: 6,
    fullName: "Animals",
    avatarUrl: "https://a-z-animals.com/media/2022/06/row-of-cats-and-dogs-together-on-white-picture-id933909576-1024x614.jpg",
    screen: "AnimalList"
},
{
    id: 7,
    fullName: "Approvals",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2H_7wCTHQEiAlNkWV48moNWxSleC_D3OlsMzxfAfS6VgeTKwdhexjZrOuke-ia-j_Yfg&usqp=CAU",
    screen: "ApprovalTask"
},
{
    id: 7,
    fullName: "Housing",
    avatarUrl: "data:image/jpeg;base64,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",
    screen: "Housing"
},


];

const Module = () => {
    const navigation = useNavigation();
    const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

    return (
        <>
       
            <Header noIcon={true} title={"Modules"} backGoesto={true}/>
        <View style={[styles.mainContainer,{backgroundColor : isSwitchOn ? "#1F415B" : "#DAE7DF"}]}>
            <View style={[styles.flatListBox,{backgroundColor : isSwitchOn ? "#1F415B" : "#DAE7DF"}]}>
                <FlatList
                    data={data}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <View>
                        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
                            <View style={styles.imageBox}>
                                <Image
                                    size={40}
                                    source={{
                                        uri: item.avatarUrl
                                    }}
                                    style={{ height: 170, width: 170, borderRadius: 15 }}
                                    alt={item.fullName}
                                />
                                <View>
                                    <Text style={styles.imageName}>
                                        {item.fullName}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>} keyExtractor={item => item.id} />
            </View>
        </View>
        </>
    )
}
export default Module;
