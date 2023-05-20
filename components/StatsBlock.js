import React from "react";
import { Text, View } from "react-native";
import { shortenNumber } from '../utils/Utils';

const StatsBlock = ({
  insightData,
  label,
  borderColor,
  borderWidth,
  backgroundColor,
}) => {
  return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'

        }}>
            <Text style={{
                fontWeight: '600',
                fontSize: 36,
                lineHeight: 44,
                color: '#1F515B',
                borderColor : borderColor ?? null,
                borderWidth : borderWidth ?? null,
                paddingHorizontal : 10,
                borderRadius : 5,
                textAlign:'center',
                backgroundColor : backgroundColor ?? null,
            }}>
                {shortenNumber(insightData)}
            </Text>
            <Text style={{
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 17,
                margin: 10,
                paddingLeft: 10,
                color: '#666666',

            }}>{label}</Text>
        </View>
    )

}

export default StatsBlock;
