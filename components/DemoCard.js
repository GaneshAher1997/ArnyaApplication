import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function DemoCard({ data, isSwitchOn }) {
    return (

        <FlatList
            data={data}
            // contentContainerStyle={{flex:1,marginBottom:200,backgroundColor:"green"}}
            renderItem={(item) => (
                <Card style={{ marginBottom:hp(2.5), backgroundColor: "#fff"}}>
                    <Card.Title
                        title="Paradise"
                        subtitle="2 day ago"
                        left={(props) => (
                            <Avatar.Text
                                size={44}
                                label="P"
                                backgroundColor="#E93353"
                                color="white"
                            />
                        )}
                        titleStyle={{
                            fontWeight: "200",
                            fontSize: hp(2),
                        }}
                        subtitleStyle={{
                            fontWeight: "400",
                            fontSize: hp(1.5),
                            marginTop: hp(-0.8)
                        }}
                    />
                    <Entypo name="dots-three-vertical" size={wp(5)}
                        style={{ color: "#717970", position: 'absolute', right: wp(5), top: hp(3.5) }}
                    />

                    <Card.Cover
                       source={require("../assets/maccow.jpg")}
                    />
                    <Card.Content style={{}}>
                        <Text
                            style={{
                                color: isSwitchOn ? "white" : "black",
                                margin: hp(1),
                                fontWeight: "300",
                                fontSize: hp(2),
                            }}
                        >
                            Today we have a new scarlet macaw added to our Paradise Macaw
                            section
                        </Text>
                    </Card.Content>
                </Card>
            )}
        />
    )
}
