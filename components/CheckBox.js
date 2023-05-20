import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";


const CheckBox = ({onPress, checked, title}) => {
    // const [checked, setChecked] = useState(false);
    return (
        <>
            <View style={styles.checkboxWrap}>
                <Text style={styles.label}>{title}</Text>
                <Checkbox.Android
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={onPress}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    checkboxWrap:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    label: {
        fontSize:14,
        fontWeight:'bold',
        color:'rgba(0,0,0,0.5)'
    }
})

export default CheckBox;